import dotenv from 'dotenv'

dotenv.config()

export default {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    mongoKey: process.env.MONGO_KEY,
    cookieKey: process.env.COOKIE_KEY,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    facebookClienteSecret: process.env.FACEBOOK_CLIENT_SECRET
}