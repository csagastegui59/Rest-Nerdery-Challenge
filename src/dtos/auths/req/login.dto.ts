import { Expose, Exclude } from 'class-transformer'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
import BaseDto from '../../base.dto'

@Exclude()
export default class LoginDto extends BaseDto {
  @Expose()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string

  @Expose()
  @IsString()
  @IsNotEmpty()
  readonly password: string
}
