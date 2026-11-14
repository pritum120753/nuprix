import type {
  MedusaNextFunction,
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"

type Bucket = { count: number; resetAt: number }

// Fixed-window limiter kept in process memory. It stops casual token
// guessing and hammering on a single server. When you run more than one
// backend instance, move this to Redis so the count is shared.
export function rateLimit(options: { windowMs: number; max: number }) {
  const buckets = new Map<string, Bucket>()

  const sweep = setInterval(() => {
    const now = Date.now()
    for (const [key, bucket] of buckets) {
      if (bucket.resetAt <= now) {
        buckets.delete(key)
      }
    }
  }, options.windowMs)
  sweep.unref()

  return (
    req: MedusaRequest,
    res: MedusaResponse,
    next: MedusaNextFunction
  ) => {
    const key = req.ip || req.socket.remoteAddress || "unknown"
    const now = Date.now()
    const bucket = buckets.get(key)

    if (!bucket || bucket.resetAt <= now) {
      buckets.set(key, { count: 1, resetAt: now + options.windowMs })
      return next()
    }

    bucket.count += 1
    if (bucket.count > options.max) {
      res.setHeader(
        "Retry-After",
        Math.ceil((bucket.resetAt - now) / 1000).toString()
      )
      return res.status(429).json({ message: "Too many requests. Try again later." })
    }
    return next()
  }
}
