import {
  createTokenRedactingLogger,
  redactDownloadTokensFromHttpLog,
} from "../http-log-redaction"

describe("redactDownloadTokensFromHttpLog", () => {
  it("redacts download tokens from development and JSON HTTP log formats", () => {
    const token = "A".repeat(43)
    expect(
      redactDownloadTokensFromHttpLog(`GET /downloads/${token} <- - (302) - 4 ms`)
    ).toBe("GET /downloads/[REDACTED] <- - (302) - 4 ms")
    expect(
      redactDownloadTokensFromHttpLog(
        `{"path":"/downloads/${token}","method":"GET"}`
      )
    ).toBe('{"path":"/downloads/[REDACTED]","method":"GET"}')
  })

  it("does not redact unrelated route identifiers", () => {
    expect(
      redactDownloadTokensFromHttpLog(
        "POST /store/customer/downloads/dent_123/regenerate"
      )
    ).toBe("POST /store/customer/downloads/dent_123/regenerate")
  })

  it("redacts before forwarding messages to the HTTP logger", () => {
    const token = "B".repeat(43)
    const http = jest.fn()
    const logger = createTokenRedactingLogger({ http } as never)

    logger.http(`GET /downloads/${token} (302)`)

    expect(http).toHaveBeenCalledWith("GET /downloads/[REDACTED] (302)")
  })
})
