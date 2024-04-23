import { Router } from "express";
import { userServices } from "../services/userServices.js";
import {faker} from '@faker-js/faker'

const route = Router()
const US = new userServices()

route.get('/userFake', (req, res) => {
    let firstName= faker.person.firstName();
    let lastName= faker.person.lastName();
    let email= faker.internet.email();
    let password= faker.internet.password();
    const user ={firstName, lastName, email, password}
    res.send(user)
})

route.post('/register', async (req, res) => {
    const {firstName, lastName, email, password} = req.body
    const result = await US.register(firstName, lastName, email, password)
    return result
})

route.post('/login', async (req, res) => {
    const {email, password} = req.body
    const result = await US.login(email, password)
    return result
})

export default route