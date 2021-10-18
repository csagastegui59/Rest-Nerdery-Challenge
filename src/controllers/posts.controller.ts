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
import UserDto from '../dtos/accounts/req/user.dto'

const findMyPosts = async (req: Request, res: Response) => {
  const userdto = plainToClass(UserDto, req.user)
  await userdto.isValid()
  const posts = await PostsService.findMyPosts(userdto.id)
  res.json({ posts }).end()
  const dto = plainToClass(PostDto, posts)
  res.status(200).send({
    data: dto,
  })
}

const create = async (req: Request, res: Response) => {
  const userdto = plainToClass(UserDto, req.user)
  await userdto.isValid()
  const dto = plainToClass(CreatePostDto, {
    accountId: userdto.id,
    ...req.body,
  })
  await dto.isValid()
  const post = await PostsService.create(dto)
  res.status(200).send({
    data: post,
  })
}

const findByAccountId = async (req: Request, res: Response) => {
  const posts = await PostsService.findByAccountId(req.params.id)
  const dto = plainToClass(PostDto, posts)
  res.status(200).send({
    data: dto,
  })
}

const update = async (req: Request, res: Response) => {
  const { postId } = req.params
  const dto = plainToClass(EditPostDto, req.body)
  await dto.isValid()
  const post = await PostsService.update(postId, dto)
  res.status(200).send({
    data: post,
  })
}

const deleteOne = async (req: Request, res: Response) => {
  const { postId } = req.params
  const post = await PostsService.delete(postId)
  res.status(200).send({
    message: 'post deleted',
  })
}

const find = async (req: Request, res: Response) => {
  const posts = await PostsService.findAllPosts()
  const dto = plainToClass(PostsDto, posts)
  res.status(200).send({
    data: dto,
  })
}

const findOne = async (req: Request, res: Response) => {
  const { accountId, postId } = req.params
  const post = await PostsService.findByOwner(accountId, postId)
  const dto = plainToClass(PostsDto, post)
  res.status(200).send({
    data: dto,
  })
}

const modDeleteOne = async (req: Request, res: Response) => {
  const { postId } = req.params
  const dto = plainToClass(DeletePostDto, req.params)
  // validacion para ver si el post te pertenece
  await dto.isValid()
  const post = await PostsService.delete(postId)
  res.status(200).send({
    data: post,
  })
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
