import { Request, Response } from 'express'
import { plainToClass } from 'class-transformer'
import createError from 'http-errors'
import CreatePostDto from '../dtos/posts/req/create-post.dto'
import PostsService from '../services/posts.service'
import AccountsService from '../services/accounts.service'
import PostDto from '../dtos/posts/res/post.dto'
import PostsDto from '../dtos/posts/res/posts.dto'
import EditPostDto from '../dtos/posts/req/edit-post.dto'
import DeletePostDto from '../dtos/posts/req/delete-post'

const findMyPosts = async (req: Request, res: Response) => {
  try {
    const account = await AccountsService.exists(req.params.id)
    if (!account) {
      throw new createError.UnprocessableEntity('Now allowed')
    }
    const posts = await PostsService.findByAccountId(req.params.id)
    const dto = plainToClass(PostDto, posts)
    res.status(200).send({
      data: dto,
    })
  } catch (error) {
    res.status(400).send({ error })
  }
}

const create = async (req: Request, res: Response) => {
  const dto = plainToClass(CreatePostDto, req.body)
  try {
    const account = await AccountsService.exists(req.body.accountId)
    if (!account) {
      throw new createError.UnprocessableEntity('Invalid data')
    }
    await dto.isValid()
    const post = await PostsService.create(dto)
    res.status(200).send({
      data: post,
    })
  } catch (error) {
    res.status(400).send({ error })
  }
}

const findByAccountId = async (req: Request, res: Response) => {
  try {
    const account = await AccountsService.exists(req.params.id)
    if (!account) {
      throw new createError.UnprocessableEntity('Invalid data')
    }
    const posts = await PostsService.findByAccountId(req.params.id)
    const dto = plainToClass(PostDto, posts)
    res.status(200).send({
      data: dto,
    })
  } catch (error) {
    res.status(400).send({ error })
  }
}

const update = async (req: Request, res: Response) => {
  const dto = plainToClass(EditPostDto, req.body)
  try {
    const validatedPost = await PostsService.exists(req.body.id)
    if (!validatedPost) {
      throw new createError.UnprocessableEntity('Post does not exist')
    }
    await dto.isValid()
    const post = await PostsService.update(req.body.id, dto)
    res.status(200).send({
      data: post,
    })
  } catch (error) {
    res.status(400).send({ error })
  }
}

const deleteOne = async (req: Request, res: Response) => {
  const { postId } = req.params
  const { accountId } = req.body
  const dto = plainToClass(DeletePostDto, { postId, accountId })
  // validacion para ver si el post te pertenece
  try {
    const validatedPost = await PostsService.exists(req.body.id)
    if (!validatedPost) {
      throw new createError.UnprocessableEntity('Post does not exist')
    }
    await dto.isValid()
    const post = await PostsService.delete(postId)
    res.status(200).send({
      data: post,
    })
  } catch (error) {
    res.status(400).send({ error })
  }
}

const find = async (req: Request, res: Response) => {
  const posts = await PostsService.findAllPosts()
  const dto = plainToClass(PostsDto, posts)
  res.status(200).send({
    data: dto,
  })
}

const findOne = async (req: Request, res: Response) => {
  try {
    const post = await PostsService.findPost(req.params.id)
    const dto = plainToClass(PostsDto, post)
    res.status(200).send({
      data: dto,
    })
  } catch (error) {
    res.status(400).send({ error })
  }
}

const modDeleteOne = async (req: Request, res: Response) => {
  const { postId } = req.params
  const dto = plainToClass(DeletePostDto, req.params)
  // validacion para ver si el post te pertenece
  try {
    const validatedPost = await PostsService.exists(req.params.postId)
    if (!validatedPost) {
      throw new createError.UnprocessableEntity('Post does not exist')
    }
    await dto.isValid()
    const post = await PostsService.delete(postId)
    res.status(200).send({
      data: post,
    })
  } catch (error) {
    res.status(400).send({ error })
  }
}

export {
  findByAccountId,
  find,
  findMyPosts,
  findOne,
  deleteOne,
  modDeleteOne,
  create,
  update,
}
