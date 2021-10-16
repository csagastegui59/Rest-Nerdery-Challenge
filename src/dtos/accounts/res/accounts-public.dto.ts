import { Expose, Exclude, Transform } from 'class-transformer'
import { IsBoolean } from 'class-validator'
import BaseDto from '../../base.dto'

@Exclude()
export default class AccountsPublicDto extends BaseDto {
  @Expose()
  readonly id: string

  @Expose()
  readonly email: string

  @Expose()
  readonly username: string

  @Expose()
  readonly name: string

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  readonly createdAt: Date

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  readonly updatedAt: Date
}
