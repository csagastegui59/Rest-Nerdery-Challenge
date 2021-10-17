import nodemailer, { SentMessageInfo } from 'nodemailer'

const transporter = nodemailer.createTransport({
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
