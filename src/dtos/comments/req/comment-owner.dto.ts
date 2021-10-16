import { Expose, Exclude } from 'class-transformer'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
import BaseDto from '../../base.dto'

@Exclude()
export default class CommentOwnerDto extends BaseDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  readonly accountId: string

  @Expose()
  @IsString()
  @IsNotEmpty()
  readonly postId: string

  @Expose()
  @IsString()
  @IsNotEmpty()
  readonly commentId: string
}
