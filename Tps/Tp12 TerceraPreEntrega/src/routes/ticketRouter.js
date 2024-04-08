import { Router } from "express";
import ticketServices from "../services/ticketService.js";

const route = Router()
const TS = new ticketServices()

route.post('/:cid/purchase', async (req, res) => {
    const result = await TS.createTicket(req.params.cid, req.body.Uid)
    res.redirect('/profile')
})

route.get('*', (req, res) => {
    res.redirect('/home')
})

export default route