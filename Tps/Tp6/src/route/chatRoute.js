import { Router } from "express";
import ChatD from '../Dao/chatDao.js'

const route =Router()
const CD = new ChatD()

route.get('/', async (req, res) => {

    const Res = (await CD.getAllMessage()).Result
    const chat = Res.reverse().map(product => {
        return {
            user: product.user,
            msg: product.msg
        };
    })
    console.log(chat);

    res.status(200).render('chat',{
        result: chat,
        style:'chat.css'
    })

})

route.post('/', async (req, res) => {

    await CD.newMessage(req.body)

    const Res = (await CD.getAllMessage()).Result
    const chat = Res.reverse().map(product => {
        return {
            user: product.user,
            msg: product.msg
        };
    })

    res.status(200).render('chat',{
        result: chat,
        style:'chat.css'
    })
})


export default route