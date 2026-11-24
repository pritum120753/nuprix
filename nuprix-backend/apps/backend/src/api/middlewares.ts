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
import { UpdatePayoutSchema } from './admin/payouts/validators'
import { UpdateProductClassificationSchema } from './admin/products/[id]/classification/validators'
import { UpdateSupportTicketSchema } from './admin/support-tickets/validators'
import {
  AssignVendorProductSchema,
  CreateVendorSchema,
  UpdateVendorSchema,
} from './admin/vendors/validators'
import { CreateSupportTicketSchema } from './store/support-tickets/validators'
import {
  ApplyVendorSchema,
  InviteVendorMemberSchema,
  RequestVendorPayoutSchema,
  UpdateVendorFulfillmentSchema,
  UpdateVendorMemberSchema,
  SubmitVendorProductSchema,
} from './store/vendors/validators'

// The product index declares filterable `status` and `sales_channel_ids`, so
// the route narrows it to published products in the key's sales channels.
export default defineMiddlewares({
  routes: [
    {
      matcher: '/admin/*',
      middlewares: [authenticate('user', ['session', 'bearer'])],
    },
    {
      matcher: '/store/vendors/me*',
      middlewares: [authenticate('customer', ['session', 'bearer'])],
    },
    {
      matcher: '/store/orders/*/fulfillment-groups',
      middlewares: [authenticate('customer', ['session', 'bearer'])],
    },
    {
      matcher: '/store/customer/downloads*',
      middlewares: [authenticate('customer', ['session', 'bearer'])],
    },
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
      matcher: '/store/customer/downloads/*/regenerate',
      middlewares: [rateLimit({ windowMs: 60_000, max: 10 })],
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
      matcher: '/admin/vendors',
      middlewares: [validateAndTransformBody(CreateVendorSchema)],
    },
    {
      method: ['PATCH'],
      matcher: '/admin/vendors/*',
      middlewares: [validateAndTransformBody(UpdateVendorSchema)],
    },
    {
      method: ['POST'],
      matcher: '/admin/vendors/*/products',
      middlewares: [validateAndTransformBody(AssignVendorProductSchema)],
    },
    {
      method: ['POST'],
      matcher: '/store/support-tickets',
      middlewares: [
        rateLimit({ windowMs: 60_000, max: 5 }),
        validateAndTransformBody(CreateSupportTicketSchema),
      ],
    },
    {
      method: ['PATCH'],
      matcher: '/admin/support-tickets/*',
      middlewares: [validateAndTransformBody(UpdateSupportTicketSchema)],
    },
    {
      method: ['POST'],
      matcher: '/store/vendors/apply',
      middlewares: [
        rateLimit({ windowMs: 60_000, max: 5 }),
        validateAndTransformBody(ApplyVendorSchema),
      ],
    },
    {
      method: ['POST'],
      matcher: '/store/vendors/me/products',
      middlewares: [validateAndTransformBody(SubmitVendorProductSchema)],
    },
    {
      method: ['POST'],
      matcher: '/store/vendors/me/members',
      middlewares: [validateAndTransformBody(InviteVendorMemberSchema)],
    },
    {
      method: ['PATCH'],
      matcher: '/store/vendors/me/orders/*/fulfillment',
      middlewares: [validateAndTransformBody(UpdateVendorFulfillmentSchema)],
    },
    {
      method: ['PATCH'],
      matcher: '/store/vendors/me/members/*',
      middlewares: [validateAndTransformBody(UpdateVendorMemberSchema)],
    },
    {
      method: ['POST'],
      matcher: '/store/vendors/me/payouts',
      middlewares: [validateAndTransformBody(RequestVendorPayoutSchema)],
    },
    {
      method: ['PATCH'],
      matcher: '/admin/payouts/*',
      middlewares: [validateAndTransformBody(UpdatePayoutSchema)],
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
