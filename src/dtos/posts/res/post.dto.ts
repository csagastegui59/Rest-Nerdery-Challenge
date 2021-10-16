import { Expose, Exclude, Transform } from 'class-transformer'
import {
  IsBoolean,
  IsNumber,
  IsPositive,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator'
import BaseDto from '../../base.dto'

@Exclude()
export default class PostDto extends BaseDto {
  @Expose()
  readonly id: string

  @Expose()
  readonly title: string

  @Expose()
  readonly content: string

  @Expose()
  readonly numLikes: number

  @Expose()
  readonly numDislikes: number

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  readonly createdAt: Date

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  readonly updatedAt: Date
}
