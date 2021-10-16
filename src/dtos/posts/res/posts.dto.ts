import { Expose, Exclude, Transform } from 'class-transformer'
import {
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
  @IsString()
  @IsNotEmpty()
  readonly id: string

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
  @IsPositive()
  readonly numLikes: number

  @Expose()
  @IsNumber()
  @IsOptional()
  @IsPositive()
  readonly numDislikes: number

  @Expose()
  readonly accountId: string

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  readonly createdAt: Date

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  readonly updatedAt: Date
}
