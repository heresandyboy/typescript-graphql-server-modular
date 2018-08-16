import { Context } from '../../utils/utils'

export const resolvers = {
  Query: {
    node (parent, { id }, ctx: Context, info) {
      return ctx.db.query.node({ id }, info)
    },
  },
  Node: {
    __resolveType (obj, context, info) {
      return obj.__typename
    }
  },
  AuthPayload: {
    user: async ({ user: { id } }, args, ctx: Context, info) => {
      return ctx.db.query.user({ where: { id } }, info)
    },
  },
}
