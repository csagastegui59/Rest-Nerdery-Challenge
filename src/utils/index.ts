import { TokenGenerator } from 'ts-token-generator'
import jwt from 'jsonwebtoken'

function getToken(): string {
  const tokGen = new TokenGenerator()
  return tokGen.generate()
}

function generateJWTToken(sub: string): string {
  return jwt.sign(
    {
      sub,
    },
    process.env.SECRET_JWT_KEY as string,
    { expiresIn: '60m' },
  )
}

export { getToken, generateJWTToken }
