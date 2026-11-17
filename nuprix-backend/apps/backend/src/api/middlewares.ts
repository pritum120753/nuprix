import {
  configureStoreSearch,
  defineMiddlewares,
  validateAndTransformBody,
} from '@medusajs/framework/http'
import { rateLimit } from './lib/rate-limit'
import {
  CreateDigitalFileSchema,
  UploadUrlSchema,
} from './admin/digital-files/validators'
import { UpdateProductClassificationSchema } from './admin/products/[id]/classification/validators'

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
      method: ['PATCH'],
      matcher: '/admin/products/*/classification',
      middlewares: [
        validateAndTransformBody(UpdateProductClassificationSchema),
      ],
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
