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
export default class CreateAccountDto extends BaseDto {
  @Expose()
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  readonly email: string

  @Expose()
  @IsString()
  @Length(6, 20)
  readonly password: string

  @Expose()
  @IsString()
  @IsOptional()
  readonly username: string

  @Expose()
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @Exclude()
  @IsBoolean()
  readonly isPublicName: boolean

  @Exclude()
  @IsBoolean()
  readonly isPublicEmail: boolean
}
