import { Account, Post, Prisma } from '@prisma/client'
import { plainToClass } from 'class-transformer'
import nodemailer from 'nodemailer'
import AccountsService from '../accounts.service'
import prisma from '../../utils/prisma'
import sendEmail from '../../utils/send-email'
import CreateAccountDto from '../../dtos/accounts/req/create-account.dto'
import UpdateAccountDto from '../../dtos/accounts/req/update-account.dto'
import PostsService from '../posts.service'
import EditPostDto from '../../dtos/posts/req/edit-post.dto'
import CreatePostDto from '../../dtos/posts/req/create-post.dto'

jest.mock('nodemailer', () => {
  return jest.fn()
})

jest.mock('../../utils/send-email', () => {
  return jest.fn()
})

let globalAccount: Account
let globalAccount2: Account
let globalPost: Post

beforeAll(async () => {
  await prisma.$connect()
  await prisma.account.deleteMany()
  globalAccount = await prisma.account.create({
    data: {
      email: 'mail1@mail.com',
      name: 'Christian',
      password: 'password',
    },
  })

  globalAccount2 = await prisma.account.create({
    data: {
      email: 'mail2@mail.com',
      name: 'Efrain',
      password: 'password',
    },
  })

  globalPost = await prisma.post.create({
    data: {
      title: 'my post',
      content: 'hello world',
      accountId: globalAccount.id,
    },
  })
})

afterAll(async () => {
  await prisma.$disconnect()
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('Accounts Service', () => {
  it('should return an array of posts', async () => {
    const posts = await PostsService.find()
    expect(Array.isArray(posts)).toBe(true)
  })

  it('should return one posts', async () => {
    const post = await PostsService.findOne(globalPost.id)
    expect(post).toHaveProperty('id')
  })

  it('should throw error when post does not exists', async () => {
    expect(async () => {
      await PostsService.findOne('123456789')
    }).rejects.toThrow()
  })

  it('should return posts by account', async () => {
    const posts = await PostsService.findByAccountId(globalAccount.id)
    expect(Array.isArray(posts)).toBe(true)
  })

  it('should return a post by owner and postId', async () => {
    const posts = await PostsService.findByOwner(
      globalAccount.id,
      globalPost.id,
    )
    expect(posts).toHaveProperty('id')
  })

  it('should return an array of all posts (draft included)', async () => {
    const posts = await PostsService.findAllPosts()
    expect(Array.isArray(posts)).toBe(true)
  })

  it('should return an array of all posts of a user', async () => {
    const posts = await PostsService.findMyPosts(globalAccount.id)
    expect(Array.isArray(posts)).toBe(true)
  })

  it('should update a post', async () => {
    const dto = plainToClass(EditPostDto, { title: 'my new title' })
    const post = await PostsService.update(globalPost.id, dto)
    expect(post.title).toBe('my new title')
  })

  it('should not update when a post does not exists', async () => {
    const dto = plainToClass(EditPostDto, { title: 'my new title' })
    expect(async () => {
      await PostsService.update('123456789', dto)
    }).rejects.toThrow()
  })

  it('should create a post', async () => {
    const dto = plainToClass(CreatePostDto, {
      accountId: globalAccount.id,
      title: 'my post in testing',
      content: 'this is the best test suite ever',
    })
    const post = await PostsService.create(dto)
    expect(post).toHaveProperty('id')
  })

  it('should delete a post', async () => {
    await PostsService.delete(globalPost.id)
    expect(async () => {
      await prisma.post.delete({ where: { id: globalPost.id } })
    }).rejects.toThrow()
  })
})
