import { Expose, Exclude } from 'class-transformer'
import { IsNotEmpty, IsString } from 'class-validator'

@Exclude()
export default class TokenDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  readonly token: string
}
