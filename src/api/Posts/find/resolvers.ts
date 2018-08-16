import { getUserId, Context } from '../../../utils/utils'

export const resolvers = {
  Query: {
    feed(parent, args, ctx: Context, info) {
      return ctx.db.query.posts({ where: { isPublished: true } }, info)
    },
  
    drafts(parent, args, ctx: Context, info) {
      const id = getUserId(ctx)
  
      const where = {
        isPublished: false,
        author: {
          id
        }
      }
  
      return ctx.db.query.posts({ where }, info)
    },
  
    post(parent, { id }, ctx: Context, info) {
      return ctx.db.query.post({ where: { id } }, info)
    },
  }
}
