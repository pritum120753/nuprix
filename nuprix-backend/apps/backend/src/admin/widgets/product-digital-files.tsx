import { defineWidgetConfig } from "@medusajs/admin-sdk"
import type { AdminProduct, DetailWidgetProps } from "@medusajs/framework/types"
import {
  Badge,
  Button,
  Container,
  Heading,
  Input,
  Label,
  Text,
  Textarea,
} from "@medusajs/ui"
import { useCallback, useEffect, useState, type FormEvent } from "react"

type ProductFulfillmentType = "digital" | "physical" | "mixed"

type DigitalFileRecord = {
  id: string
  product_id: string
  title: string
  file_key: string
  file_name: string
  mime_type: string | null
  size_bytes: number | null
  license_note: string | null
  max_downloads: number
  expires_after_days: number | null
}

function formatBytes(bytes: number | null): string {
  if (!bytes || bytes <= 0) {
    return "Unknown size"
  }
  if (bytes < 1024) {
    return `${bytes} B`
  }
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function readProductType(product: AdminProduct): ProductFulfillmentType {
  const raw = product.metadata?.nuprix_product_type
  if (raw === "digital" || raw === "physical" || raw === "mixed") {
    return raw
  }
  return "physical"
}

const ProductDigitalFilesWidget = ({
  data: product,
}: DetailWidgetProps<AdminProduct>) => {
  const [files, setFiles] = useState<DigitalFileRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [productType, setProductType] = useState<ProductFulfillmentType>(() =>
    readProductType(product)
  )
  const [savingType, setSavingType] = useState(false)

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [title, setTitle] = useState("")
  const [licenseNote, setLicenseNote] = useState("")
  const [maxDownloads, setMaxDownloads] = useState("5")
  const [expiresAfterDays, setExpiresAfterDays] = useState("")
  const [uploading, setUploading] = useState(false)
  const [removingId, setRemovingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const loadFiles = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(
        `/admin/digital-files?product_id=${encodeURIComponent(product.id)}`,
        { credentials: "include" }
      )
      if (!res.ok) {
        throw new Error(`Failed to load digital files (${res.status})`)
      }
      const body = (await res.json()) as { digital_files?: DigitalFileRecord[] }
      const list = body.digital_files ?? []
      setFiles(list)
      if (list.length > 0 && productType === "physical") {
        setProductType("digital")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load files")
    } finally {
      setLoading(false)
    }
  }, [product.id, productType])

  useEffect(() => {
    void loadFiles()
  }, [loadFiles])

  const handleTypeChange = async (nextType: ProductFulfillmentType) => {
    setError(null)
    setSuccess(null)
    setSavingType(true)
    try {
      const res = await fetch(
        `/admin/products/${encodeURIComponent(product.id)}/classification`,
        {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ product_type: nextType }),
        }
      )
      const body = (await res.json().catch(() => ({}))) as {
        message?: string
        product_type?: ProductFulfillmentType
      }
      if (!res.ok) {
        throw new Error(body.message || "Failed to update classification")
      }
      setProductType(body.product_type ?? nextType)
      setSuccess(`Product classification updated to "${nextType}".`)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update classification"
      )
    } finally {
      setSavingType(false)
    }
  }

  const handleUpload = async (e: FormEvent) => {
    e.preventDefault()
    if (!selectedFile) {
      setError("Please select a file to upload.")
      return
    }

    setError(null)
    setSuccess(null)
    setUploading(true)

    try {
      const uploadUrlRes = await fetch("/admin/digital-files/upload-url", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          file_name: selectedFile.name,
          mime_type: selectedFile.type || undefined,
        }),
      })

      if (!uploadUrlRes.ok) {
        const errBody = (await uploadUrlRes.json().catch(() => ({}))) as {
          message?: string
        }
        throw new Error(errBody.message || "Failed to generate upload URL")
      }

      const { file_key, upload_url } = (await uploadUrlRes.json()) as {
        file_key: string
        upload_url: string
      }

      const putRes = await fetch(upload_url, {
        method: "PUT",
        headers: selectedFile.type
          ? { "Content-Type": selectedFile.type }
          : undefined,
        body: selectedFile,
      })

      if (!putRes.ok) {
        throw new Error(`Storage upload failed (${putRes.status})`)
      }

      const parsedMax = Number.parseInt(maxDownloads, 10)
      const parsedExpiry = expiresAfterDays.trim()
        ? Number.parseInt(expiresAfterDays, 10)
        : undefined

      const createRes = await fetch("/admin/digital-files", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: product.id,
          title: title.trim() || selectedFile.name,
          file_key,
          file_name: selectedFile.name,
          mime_type: selectedFile.type || undefined,
          size_bytes: selectedFile.size,
          license_note: licenseNote.trim() || undefined,
          max_downloads: Number.isFinite(parsedMax) ? parsedMax : 5,
          expires_after_days:
            parsedExpiry && Number.isFinite(parsedExpiry)
              ? parsedExpiry
              : undefined,
        }),
      })

      if (!createRes.ok) {
        const errBody = (await createRes.json().catch(() => ({}))) as {
          message?: string
        }
        throw new Error(errBody.message || "Failed to attach digital file")
      }

      setSelectedFile(null)
      setTitle("")
      setLicenseNote("")
      setMaxDownloads("5")
      setExpiresAfterDays("")
      setSuccess("Digital file uploaded and attached to product.")
      await loadFiles()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed")
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = async (id: string) => {
    setError(null)
    setSuccess(null)
    setRemovingId(id)
    try {
      const res = await fetch(`/admin/digital-files/${encodeURIComponent(id)}`, {
        method: "DELETE",
        credentials: "include",
      })
      if (!res.ok) {
        throw new Error(`Failed to remove file (${res.status})`)
      }
      setSuccess("Digital file removed.")
      await loadFiles()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to remove file")
    } finally {
      setRemovingId(null)
    }
  }

  return (
    <Container className="divide-y p-0">
      <div className="flex flex-col gap-y-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Heading level="h2">Digital Delivery & Classification</Heading>
          <Text size="small" className="text-ui-fg-subtle">
            Manage authoritative fulfillment type and private downloadable
            files for this product.
          </Text>
        </div>
        <div className="flex items-center gap-x-2">
          <select
            aria-label="Product classification"
            value={productType}
            onChange={(e) =>
              void handleTypeChange(e.target.value as ProductFulfillmentType)
            }
            disabled={savingType}
            className="h-8 rounded-md border border-ui-border-base bg-ui-bg-field px-2.5 text-sm text-ui-fg-base"
          >
            <option value="physical">Physical</option>
            <option value="digital">Digital</option>
            <option value="mixed">Mixed (Digital + Physical)</option>
          </select>
          <Badge color={productType === "physical" ? "green" : "blue"}>
            {productType.toUpperCase()}
          </Badge>
        </div>
      </div>

      {(error || success) && (
        <div className="px-6 py-3">
          {error && (
            <Text size="small" className="text-ui-fg-error">
              {error}
            </Text>
          )}
          {success && (
            <Text size="small" className="text-ui-fg-interactive">
              {success}
            </Text>
          )}
        </div>
      )}

      <div className="px-6 py-4 space-y-3">
        <Text size="small" weight="plus">
          Attached Digital Files ({files.length})
        </Text>
        {loading ? (
          <Text size="small" className="text-ui-fg-subtle">
            Loading attached files...
          </Text>
        ) : files.length === 0 ? (
          <Text size="small" className="text-ui-fg-subtle">
            No digital files attached yet.
          </Text>
        ) : (
          <div className="divide-y rounded-md border border-ui-border-base">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex flex-col gap-2 p-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="space-y-0.5">
                  <Text size="small" weight="plus">
                    {file.title}
                  </Text>
                  <Text size="xsmall" className="text-ui-fg-subtle">
                    {file.file_name} · {formatBytes(file.size_bytes)} · Max{" "}
                    {file.max_downloads} downloads
                    {file.expires_after_days
                      ? ` · Expires in ${file.expires_after_days} days`
                      : ""}
                  </Text>
                  {file.license_note && (
                    <Text size="xsmall" className="text-ui-fg-muted">
                      License: {file.license_note}
                    </Text>
                  )}
                </div>
                <Button
                  variant="secondary"
                  size="small"
                  disabled={removingId === file.id}
                  onClick={() => void handleRemove(file.id)}
                >
                  {removingId === file.id ? "Removing..." : "Remove"}
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <form onSubmit={handleUpload} className="px-6 py-4 space-y-4">
        <Text size="small" weight="plus">
          Upload & Attach New File
        </Text>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="nuprix-digital-file">File</Label>
            <Input
              id="nuprix-digital-file"
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0] ?? null
                setSelectedFile(file)
                if (file && !title) {
                  setTitle(file.name)
                }
              }}
              disabled={uploading}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="nuprix-digital-title">Display Title</Label>
            <Input
              id="nuprix-digital-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Nuprix UI Kit v1.0"
              disabled={uploading}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="nuprix-digital-max">Max Downloads (1–100)</Label>
            <Input
              id="nuprix-digital-max"
              type="number"
              min={1}
              max={100}
              value={maxDownloads}
              onChange={(e) => setMaxDownloads(e.target.value)}
              disabled={uploading}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="nuprix-digital-expiry">
              Expires After Days (optional)
            </Label>
            <Input
              id="nuprix-digital-expiry"
              type="number"
              min={1}
              max={3650}
              value={expiresAfterDays}
              onChange={(e) => setExpiresAfterDays(e.target.value)}
              placeholder="Leave blank for no expiry"
              disabled={uploading}
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="nuprix-digital-license">
            License Note (optional)
          </Label>
          <Textarea
            id="nuprix-digital-license"
            value={licenseNote}
            onChange={(e) => setLicenseNote(e.target.value)}
            placeholder="e.g. Single-user commercial license"
            disabled={uploading}
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit" disabled={uploading || !selectedFile}>
            {uploading ? "Uploading..." : "Upload & Attach"}
          </Button>
        </div>
      </form>
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "product.details.after",
})

export default ProductDigitalFilesWidget
