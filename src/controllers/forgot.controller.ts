import { Request, Response } from 'express'

const create = (req: Request, res: Response) => {
  res.send({
    message: 'create',
  })
}

const validate = (req: Request, res: Response) => {
  res.send({
    message: 'validate',
  })
}

export { create, validate }
