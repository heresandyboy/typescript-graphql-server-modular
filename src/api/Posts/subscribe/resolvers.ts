import { Context } from '../../../utils/utils'

export const resolvers = {
  Subscription: {
    feedSubscription: {
      subscribe: (parent, args, ctx: Context, info) => {
        return ctx.db.subscription.post(
          {
            where: {
              node: {
                isPublished: true,
              },
            },
          },
          info,
        )
      },
    },
  }
}
