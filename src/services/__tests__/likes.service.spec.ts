import { Account, Comment, Post, Like, Dislike } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { mocked } from 'ts-jest/utils'
import { plainToClass } from 'class-transformer'
import nodemailer from 'nodemailer'
import AccountsService from '../accounts.service'
import prisma from '../../utils/prisma'
import { generateJWTToken } from '../../utils'
import sendEmail from '../../utils/send-email'
import CreateAccountDto from '../../dtos/accounts/req/create-account.dto'
import UpdateAccountDto from '../../dtos/accounts/req/update-account.dto'
import AuthsService from '../auths.service'
import LoginDto from '../../dtos/auths/req/login.dto'
import CommentsService from '../comments.service'
import CommentOwnerDto from '../../dtos/comments/req/comment-owner.dto'
import UpdateCommentDto from '../../dtos/comments/req/update-comment.dto'
import CreateCommentDto from '../../dtos/comments/req/create-comment.dto'
import LikesService from '../likes.service'

jest.mock('nodemailer', () => {
  return jest.fn()
})

jest.mock('../../utils/send-email', () => {
  return jest.fn()
})

jest.mock('bcryptjs')

jest.mock('../../utils')

jest.mock('nodemailer', () => {
  return jest.fn()
})

jest.mock('../../utils/send-email', () => {
  return jest.fn()
})

jest.mock('bcryptjs')

jest.mock('../../utils')

let globalAccount: Account
let globalAccount2: Account
let globalPost: Post
let globalComment: Comment
let globalLikePost: Like
let globalLikeComment: Like
let globalDislikePost: Dislike
let globalDislikeComment: Dislike

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

  globalComment = await prisma.comment.create({
    data: {
      content: 'first comment',
      postId: globalPost.id,
      accountId: globalAccount2.id,
    },
  })

  globalLikePost = await prisma.like.create({
    data: {
      postId: globalPost.id,
      accountId: globalAccount.id,
    },
  })

  globalDislikePost = await prisma.dislike.create({
    data: {
      postId: globalPost.id,
      accountId: globalAccount2.id,
    },
  })

  globalLikeComment = await prisma.like.create({
    data: {
      accountId: globalAccount.id,
      commentId: globalComment.id,
    },
  })

  globalDislikeComment = await prisma.dislike.create({
    data: {
      accountId: globalAccount2.id,
      commentId: globalComment.id,
    },
  })
})

afterAll(async () => {
  await prisma.$disconnect()
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('comments service', () => {
  it('should return a post if exists', async () => {
    const post = await LikesService.validatePost(globalPost.id)
    expect(post).toHaveProperty('id')
  })

  it('should throw an error if a post does not exists', async () => {
    expect(async () => {
      await LikesService.validatePost('1234567890')
    }).rejects.toThrow()
  })

  it('should return a comment if exists', async () => {
    const comment = await LikesService.validateComment(globalComment.id)
    expect(comment).toHaveProperty('id')
  })

  it('should throw an error if a post does not exists', async () => {
    expect(async () => {
      await LikesService.validateComment('1234567890')
    }).rejects.toThrow()
  })

  it('should return an error if an account does not exists', async () => {
    expect(async () => {
      await LikesService.validateAccount('1234567890')
    }).rejects.toThrow()
  })

  it('should throw error if post is not valid', async () => {

  })
})
