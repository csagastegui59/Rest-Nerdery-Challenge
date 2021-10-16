import { Expose, Exclude } from 'class-transformer'
import { IsNotEmpty, IsString } from 'class-validator'
import BaseDto from '../../base.dto'

@Exclude()
export default class PostLikeDto extends BaseDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  readonly accountId: string

  @Expose()
  @IsString()
  @IsNotEmpty()
  readonly postId: string
}
