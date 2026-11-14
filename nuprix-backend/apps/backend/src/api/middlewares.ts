import {
  authenticate,
  configureStoreSearch,
  defineMiddlewares,
  validateAndTransformBody,
} from '@medusajs/framework/http'
import { rateLimit } from './lib/rate-limit'
import {
  CreateDigitalFileSchema,
  UploadUrlSchema,
} from './admin/digital-files/validators'

// The product index declares filterable `status` and `sales_channel_ids`, so
// the route narrows it to published products in the key's sales channels.
export default defineMiddlewares({
  routes: [
    {
      method: ['GET'],
      matcher: '/downloads/*',
      middlewares: [rateLimit({ windowMs: 60_000, max: 30 })],
    },
    {
      method: ['GET'],
      matcher: '/store/customer/downloads',
      middlewares: [authenticate('customer', ['session', 'bearer'])],
    },
    {
      method: ['POST'],
      matcher: '/store/customer/downloads/*/regenerate',
      middlewares: [
        authenticate('customer', ['session', 'bearer']),
        rateLimit({
          windowMs: 15 * 60_000,
          max: 5,
          key: (req) => {
            const actorId = (
              req as typeof req & {
                auth_context?: { actor_id?: string }
              }
            ).auth_context?.actor_id
            return actorId
              ? `customer:${actorId}`
              : `ip:${req.ip || req.socket.remoteAddress || "unknown"}`
          },
        }),
      ],
    },
    {
      method: ['POST'],
      matcher: '/admin/digital-files/upload-url',
      middlewares: [validateAndTransformBody(UploadUrlSchema)],
    },
    {
      method: ['POST'],
      matcher: '/admin/digital-files',
      middlewares: [validateAndTransformBody(CreateDigitalFileSchema)],
    },
    {
      method: ['POST'],
      matcher: '/store/search',
      middlewares: [
        configureStoreSearch({
          allowed_indexes: {
            product: true,
          },
        }),
      ],
    },
  ],
})
