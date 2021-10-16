import { Expose, Exclude } from 'class-transformer'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
import BaseDto from '../../base.dto'

@Exclude()
export default class ValidateEmailDto extends BaseDto {
  @Expose()
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  readonly email: string

  @Expose()
  @IsString()
  @IsNotEmpty()
  readonly tokenEmail: string
}
