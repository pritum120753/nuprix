import { HttpTypes } from "@medusajs/types"
import { clx } from "@modules/common/components/ui"
import React from "react"

type OptionSelectProps = {
  option: HttpTypes.StoreProductOption
  current: string | undefined
  updateOption: (title: string, value: string) => void
  title: string
  name: string
  disabled: boolean
  "data-testid"?: string
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
  name,
  "data-testid": dataTestId,
  disabled,
}) => {
  const filteredOptions = (option.values ?? []).map((v) => v.value)

  return (
    <fieldset className="flex flex-col gap-y-3" disabled={disabled}>
      <legend className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-nuprix-muted">
        Select {title}
      </legend>
      <div
        className="flex flex-wrap gap-2"
        data-testid={dataTestId}
      >
        {filteredOptions.map((v) => {
          const id = `${name}-${v}`.replace(/[^A-Za-z0-9_-]/g, "-")
          return (
            <div key={v}>
              <input
                type="radio"
                id={id}
                name={name}
                value={v}
                checked={v === current}
                onChange={() => updateOption(option.id, v)}
                className="peer sr-only"
              />
              <label
                htmlFor={id}
                className={clx(
                  "flex min-h-11 items-center justify-center cursor-pointer rounded-lg border border-nuprix-line bg-white px-4 text-sm font-semibold text-nuprix-ink peer-focus-visible:ring-2 peer-focus-visible:ring-nuprix-indigo peer-focus-visible:ring-offset-2 peer-disabled:cursor-not-allowed",
                  {
                    "border-nuprix-indigo bg-nuprix-indigo text-white": v === current,
                    "hover:shadow-elevation-card-rest transition-shadow ease-in-out duration-150":
                      v !== current,
                  }
                )}
                data-testid="option-button"
              >
                {v}
              </label>
            </div>
          )
        })}
      </div>
    </fieldset>
  )
}

export default OptionSelect
