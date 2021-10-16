import { Expose, Exclude } from 'class-transformer'
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator'
import BaseDto from '../../base.dto'

@Exclude()
export default class UpdateAccountDto extends BaseDto {
  @Expose()
  @IsEmail()
  @IsString()
  @IsOptional()
  readonly email: string

  @Expose()
  @IsString()
  @IsOptional()
  @Length(6, 20)
  readonly password: string

  @Expose()
  @IsString()
  @IsOptional()
  readonly username: string

  @Expose()
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  readonly name: string

  @Exclude()
  @IsOptional()
  @IsBoolean()
  readonly isPublicName: boolean

  @Exclude()
  @IsOptional()
  @IsBoolean()
  readonly isPublicEmail: boolean
}
