import { Router } from "express";
import { cartServices } from "../services/cartServices.js";
import { logger } from "../utils/loggers.js";

const CS = new cartServices()
const route = Router()

route.post('/addProduct/:Cid/:Pid', async (req, res) => {
    const {Cid, Pid }= req.params
    const {email, quantity} = req.body
    await CS.addProduct(Cid, Pid, email, quantity)
    res.redirect('/profile')
})

export default route
