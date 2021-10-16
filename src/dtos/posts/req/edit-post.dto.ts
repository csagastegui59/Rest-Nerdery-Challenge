import { Expose, Exclude } from 'class-transformer'
import {
  IsBoolean,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator'
import BaseDto from '../../base.dto'

@Exclude()
export default class EditPostDto extends BaseDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly id: string

  @Expose()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly title: string

  @Expose()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
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
}
