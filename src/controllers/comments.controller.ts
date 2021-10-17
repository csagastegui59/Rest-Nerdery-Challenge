import { plainToClass } from 'class-transformer'
import { Request, Response } from 'express'
import UserDto from '../dtos/accounts/req/user.dto'
import CommentOwnerDto from '../dtos/comments/req/comment-owner.dto'
import CreateCommentDto from '../dtos/comments/req/create-comment.dto'
import UpdateCommentDto from '../dtos/comments/req/update-comment.dto'
import CommentsService from '../services/comments.service'

const create = async (req: Request, res: Response) => {
  const userdto = plainToClass(UserDto, req.user)
  await userdto.isValid()
  const { postId } = req.params
  const createPostDto = plainToClass(CreateCommentDto, {
    postId,
    accountId: userdto.id,
    ...req.body,
  })

  await createPostDto.isValid()
  const comment = await CommentsService.create(createPostDto)
  res.send({
    data: comment,
  })
}

const find = async (req: Request, res: Response) => {
  const { postId } = req.params
  const comments = await CommentsService.findByPostId(postId)
  res.send({
    data: comments,
  })
}

const update = async (req: Request, res: Response) => {
  const userdto = plainToClass(UserDto, req.user)
  await userdto.isValid()
  const { commentId, postId } = req.params
  const commentOwner = plainToClass(CommentOwnerDto, {
    commentId,
    postId,
    accountId: userdto.id,
  })
  const commentDto = plainToClass(UpdateCommentDto, req.body)
  const comment = await CommentsService.update(commentOwner, commentDto)
  res.send({
    data: comment,
  })
}

const deleteOne = async (req: Request, res: Response) => {
  const userdto = plainToClass(UserDto, req.user)
  await userdto.isValid()
  const { commentId, postId } = req.params
  const commentOwner = plainToClass(CommentOwnerDto, {
    commentId,
    postId,
    accountId: userdto.id,
  })
  const comment = await CommentsService.delete(commentOwner)
  res.send({
    message: 'comment deleted',
  })
}

export { create, find, update, deleteOne }
