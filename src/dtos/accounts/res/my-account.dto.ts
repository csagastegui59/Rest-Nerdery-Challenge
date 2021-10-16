import { Expose, Exclude, Transform } from 'class-transformer'
import BaseDto from '../../base.dto'

@Exclude()
export default class MyAccountDto extends BaseDto {
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
  readonly verifiedAt: Date

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  readonly createdAt: Date

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  readonly updatedAt: Date
}
