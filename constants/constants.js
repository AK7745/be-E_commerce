import dotenv from 'dotenv'
dotenv.config()
export const WEB_TOKEN_SECRET_KEY=process.env.WEB_TOKEN_SECRET_KEY
export const CHANGE_PASSWORD_SECRET_KEY=process.env.CHANGE_PASSWORD_SECRET_KEY
export const USER_EMAIL_NODE_MAILER=process.env.USER_EMAIL_NODE_MAILER
export const USER_PASS_NODE_MAILER=process.env.USER_PASS_NODE_MAILER
export const NODE_MAILER_SERVICE=process.env.NODE_MAILER_SERVICE
