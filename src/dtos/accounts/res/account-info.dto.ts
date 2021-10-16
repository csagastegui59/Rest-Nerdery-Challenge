import { Expose, Exclude, Transform } from 'class-transformer'
import { IsBoolean, IsOptional } from 'class-validator'
import BaseDto from '../../base.dto'

@Exclude()
export default class AccountInfoDto extends BaseDto {
  @Expose()
  readonly id: string

  @Expose()
  readonly email: string

  @Expose()
  readonly username: string

  @Expose()
  readonly name: string

  @Expose()
  readonly isPublicName: boolean

  @Expose()
  readonly isPublicEmail: boolean

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  readonly createdAt: Date

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  readonly updatedAt: Date
}
