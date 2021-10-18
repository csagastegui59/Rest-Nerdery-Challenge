import { Prisma, Post } from '@prisma/client'
import createError from 'http-errors'
import CreatePostDto from '../dtos/posts/req/create-post.dto'
import EditPostDto from '../dtos/posts/req/edit-post.dto'
import prisma from '../utils/prisma'

export default class PostsService {
  static async find(): Promise<Post[]> {
    return prisma.post.findMany({ where: { draft: false } })
  }

  static async findOne(id: string): Promise<Post> {
    return prisma.post.findUnique({ where: { id } })
  }

  static async findByAccountId(accountId: string): Promise<Post[]> {
    return prisma.post.findMany({ where: { accountId, draft: false } })
  }

  static async findByOwner(accountId: string, postId: string): Promise<Post> {
    return prisma.post.findFirst({ where: { accountId, id: postId } })
  }

  static async findAllPosts(): Promise<Post[]> {
    return prisma.post.findMany({ where: { draft: false } })
  }

  static async findMyPosts(accountId: string): Promise<Post[]> {
    return prisma.post.findMany({ where: { accountId } })
  }

  static async update(id: string, input: EditPostDto): Promise<Post> {
    return prisma.post.update({
      data: input,
      where: {
        id,
      },
    })
  }

  static async create(input: CreatePostDto): Promise<Post> {
    return prisma.post.create({ data: input })
  }

  static async delete(id: string): Promise<Post> {
    return prisma.post.delete({
      where: {
        id,
      },
    })
  }
}
