import { Prisma, Comment } from '@prisma/client'
import createError from 'http-errors'
import CommentOwnerDto from '../dtos/comments/req/comment-owner.dto'
import CreateCommentDto from '../dtos/comments/req/create-comment.dto'
import UpdateCommentDto from '../dtos/comments/req/update-comment.dto'
import prisma from './prisma.service'

export default class CommentsService {
  static async find(): Promise<Comment[]> {
    return prisma.comment.findMany({})
  }

  static async findOne(id: string): Promise<Comment> {
    return prisma.comment.findUnique({ where: { id } })
  }

  static async findByPostId(postId: string): Promise<Comment[]> {
    return prisma.comment.findMany({ where: { postId, draft: false } })
  }

  static async findByOwner(
    accountId: string,
    postId: string,
  ): Promise<Comment> {
    return prisma.comment.findFirst({ where: { accountId, postId } })
  }

  static async update(
    commentOwner: CommentOwnerDto,
    input: UpdateCommentDto,
  ): Promise<Comment> {
    const count = await prisma.post.count({
      where: { id: commentOwner.postId, accountId: commentOwner.accountId },
    })

    if (!count) {
      throw new createError.UnprocessableEntity('invalid data')
    }

    return prisma.comment.update({
      data: input,
      where: {
        id: commentOwner.commentId,
      },
    })
  }

  static async create(input: CreateCommentDto): Promise<Comment> {
    return prisma.comment.create({ data: input })
  }

  static async delete(commentOwner: CommentOwnerDto): Promise<Comment> {
    const count = await prisma.post.count({
      where: { id: commentOwner.postId, accountId: commentOwner.accountId },
    })

    if (!count) {
      throw new createError.UnprocessableEntity('invalid data')
    }

    return prisma.comment.delete({
      where: {
        id: commentOwner.commentId,
      },
    })
  }

  static async exists(id: string): Promise<boolean> {
    const count = await prisma.comment.count({ where: { id } })
    if (!count) {
      throw new createError.UnprocessableEntity('register does not exist')
    }

    return true
  }

  static async existsWithPost(id: string, postId: string): Promise<boolean> {
    const count = await prisma.comment.count({ where: { id, postId } })
    if (!count) {
      throw new createError.UnprocessableEntity('register does not exist')
    }

    return true
  }
}
