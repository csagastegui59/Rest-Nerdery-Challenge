import { Prisma, Comment } from '@prisma/client'
import createError from 'http-errors'
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

  static async update(id: string, input: UpdateCommentDto): Promise<Comment> {
    try {
      return prisma.comment.update({
        data: input,
        where: {
          id,
        },
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new createError.UnprocessableEntity('invalid data')
        }
      }

      throw error
    }
  }

  static async create(input: CreateCommentDto): Promise<Comment> {
    return prisma.comment.create({ data: input })
  }

  static async delete(id: string): Promise<Comment> {
    return prisma.comment.delete({
      where: {
        id,
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
