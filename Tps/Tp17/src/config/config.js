import dotenv from 'dotenv'

dotenv.config()

export default {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    mongoSecret: process.env.SECRET_MONGO,
    cookieSecret: process.env.SECRET_COOKIE,
    clientSecret: process.env.CLIENT_SECRET,
    clienteId: process.env.CLIENTE_ID,
}