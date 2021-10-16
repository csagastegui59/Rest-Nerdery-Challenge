import nodemailer, { SentMessageInfo } from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()
const transporter = nodemailer.createTransport({
  // host: 'localhost',
  // port: 3000,
  // secure: false,
  // requireTLS: true,
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
  logger: true,
})

export default async function sendEmail(
  email: string,
  token: string,
): Promise<SentMessageInfo> {
  const info = await transporter.sendMail({
    from: 'me',
    to: email,
    subject: 'Verify your account from BLOGApi',
    text: `This is yor token: ${token}`,
  })

  return info
}
