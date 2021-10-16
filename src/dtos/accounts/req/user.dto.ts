import { Expose, Exclude } from 'class-transformer'
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator'
import BaseDto from '../../base.dto'

@Exclude()
export default class UserDto extends BaseDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  readonly id: string
}
