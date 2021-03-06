import { getUserId, Context } from '../../../utils/utils'

export const resolvers = {
    Mutation: {
        async deletePost(parent, { id }, ctx: Context, info) {
          const userId = getUserId(ctx)
          const postExists = await ctx.db.exists.Post({
            id,
            author: { id: userId },
          })
          if (!postExists) {
            throw new Error(`Post not found or you're not the author`)
          }
      
          return ctx.db.mutation.deletePost({ where: { id } })
        },
    }
}
