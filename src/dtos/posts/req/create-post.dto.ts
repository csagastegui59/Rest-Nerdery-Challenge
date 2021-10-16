import { Expose, Exclude } from 'class-transformer'
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'
import BaseDto from '../../base.dto'

@Exclude()
export default class CreatePostDto extends BaseDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  readonly title: string

  @Expose()
  @IsString()
  @IsNotEmpty()
  readonly content: string

  @Expose()
  @IsNumber()
  @IsOptional()
  readonly numLikes: number

  @Expose()
  @IsNumber()
  @IsOptional()
  readonly numDislikes: number

  @Expose()
  @IsBoolean()
  @IsOptional()
  readonly draft: boolean

  @Expose()
  @IsString()
  @IsNotEmpty()
  readonly accountId: string
}
