import createHttpError from 'http-errors'
import passport from 'passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import prisma from '../services/prisma.service'

passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_JWT_KEY as string,
    },
    async (jwtPayload, done) => {
      const account = await prisma.account.findUnique({
        where: {
          id: jwtPayload.sub,
        },
        rejectOnNotFound: false,
      })

      if (!account) {
        done(new createHttpError.Unauthorized('Incorrect credentials'), null)
      }

      done(null, { id: account?.id })
    },
  ),
)