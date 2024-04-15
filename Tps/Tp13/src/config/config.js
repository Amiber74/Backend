import dotenv from 'dotenv'

dotenv.config()

export default {
    port : process.env.PORT,
    mongoUrl : process.env.MONGO_URL,
    secretMongo : process.env.SECRET_MONGO,
    secretCookie: process.env.SECRET_COOKIE,

}