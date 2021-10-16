import { Dislike, Like, Post, Comment } from '@prisma/client'
import createError from 'http-errors'
import CommentLikeDto from '../dtos/likes/req/comment-like.dto'
import PostLikeDto from '../dtos/likes/req/post-like.dto'
import prisma from './prisma.service'

export default class LikesService {
  private static async validatePost(id: string): Promise<Post> {
    const post = await prisma.post.findUnique({
      where: { id },
      rejectOnNotFound: false,
    })
    if (!post) {
      throw new createError.NotFound('resource does not exist')
    }

    return post
  }

  private static async validateComment(id: string): Promise<Comment> {
    const comment = await prisma.comment.findUnique({
      where: { id },
      rejectOnNotFound: false,
    })
    if (!comment) {
      throw new createError.NotFound('resource does not exist')
    }

    return comment
  }

  private static async validateAccount(id: string): Promise<void> {
    if (!(await prisma.account.count({ where: { id } }))) {
      throw new createError.NotFound('resource does not exist')
    }
  }

  static async likePost(input: PostLikeDto): Promise<Like> {
    const post = await this.validatePost(input.postId)
    await this.validateAccount(input.accountId)

    let { numLikes, numDislikes } = post

    const prevDislike = await prisma.dislike.findUnique({
      where: {
        postDislike: {
          postId: input.postId,
          accountId: input.accountId,
        },
      },
      rejectOnNotFound: false,
    })

    if (prevDislike) {
      await prisma.dislike.delete({ where: { id: prevDislike.id } })
      numDislikes -= 1
    }

    if (
      await prisma.like.count({
        where: { accountId: input.accountId, postId: input.postId },
      })
    ) {
      throw new createError.UnprocessableEntity('like already exists')
    }

    numLikes += 1

    await prisma.post.update({
      where: { id: post.id },
      data: { numLikes, numDislikes },
    })

    return prisma.like.create({ data: input })
  }

  static async dislikePost(input: PostLikeDto): Promise<Like> {
    const post = await this.validatePost(input.postId)
    await this.validateAccount(input.accountId)

    let { numLikes, numDislikes } = post

    const prevLike = await prisma.like.findUnique({
      where: {
        postLike: {
          postId: input.postId,
          accountId: input.accountId,
        },
      },
      rejectOnNotFound: false,
    })

    if (prevLike) {
      await prisma.like.delete({ where: { id: prevLike.id } })
      numLikes -= 1
    }

    if (
      await prisma.dislike.count({
        where: { accountId: input.accountId, postId: input.postId },
      })
    ) {
      throw new createError.UnprocessableEntity('dislike already exists')
    }

    numDislikes += 1

    await prisma.post.update({
      where: { id: post.id },
      data: { numLikes, numDislikes },
    })

    return prisma.dislike.create({ data: input })
  }

  static async likeComment(input: CommentLikeDto): Promise<Like> {
    const comment = await this.validateComment(input.commentId)
    await this.validateAccount(input.accountId)

    let { numLikes, numDislikes } = comment

    const prevDislike = await prisma.dislike.findUnique({
      where: {
        commentDislike: {
          commentId: input.commentId,
          accountId: input.accountId,
        },
      },
      rejectOnNotFound: false,
    })

    if (prevDislike) {
      await prisma.dislike.delete({ where: { id: prevDislike.id } })
      numDislikes -= 1
    }

    if (
      await prisma.like.count({
        where: { accountId: input.accountId, commentId: input.commentId },
      })
    ) {
      throw new createError.UnprocessableEntity('like already exists')
    }

    numLikes += 1

    await prisma.comment.update({
      where: { id: comment.id },
      data: { numLikes, numDislikes },
    })

    return prisma.like.create({ data: input })
  }

  static async dislikeComment(input: CommentLikeDto): Promise<Dislike> {
    const comment = await this.validateComment(input.commentId)
    await this.validateAccount(input.accountId)

    let { numLikes, numDislikes } = comment

    const prevLike = await prisma.like.findUnique({
      where: {
        commentLike: {
          commentId: input.commentId,
          accountId: input.accountId,
        },
      },
      rejectOnNotFound: false,
    })

    if (prevLike) {
      await prisma.like.delete({ where: { id: prevLike.id } })
      numLikes -= 1
    }

    if (
      await prisma.dislike.count({
        where: { accountId: input.accountId, commentId: input.commentId },
      })
    ) {
      throw new createError.UnprocessableEntity('dislike already exists')
    }

    numDislikes += 1

    await prisma.comment.update({
      where: { id: comment.id },
      data: { numLikes, numDislikes },
    })

    return prisma.dislike.create({ data: input })
  }
}
