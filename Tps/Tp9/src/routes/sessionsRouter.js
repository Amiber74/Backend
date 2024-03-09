import { Router } from "express"
import userService from '../services/userServices.js'
import { isValidPassword } from "../utils/bcrypt.js"

const route = Router()
const US = new userService()


route.get('/ping', (req, res) => {
    res.send('pong')
})

route.post('/login', async (req, res) => {

    const {email, pass} =req.body
    // console.log(req.body);
    if(!email || !pass){
        return res.redirect('/home')
    }

    const user = await US.UserByEmail(email)
    
    if (!user) {
        return res.status(400).send({status:'error', error:'user not found'})
    }
    
    if (!isValidPassword(user, pass)){
        return res.status(403).send({status:'error', error:'incorrect password'})
    }
    
    const userMod = Object.assign({}, user)
    delete userMod._doc.password
    
    
    req.session.user=userMod._doc
    res.redirect('/profile')

})

route.post('/register', async (req, res) => {

    const {firstName, lastName, email, age, password} = req.body
    parseInt(age)
    
    if(!firstName || !lastName || !email || !age || !password){
        res.redirect("/home");  
    }

    const existUser = await US.UserByEmail(email)
    if(existUser){
        res.redirect('/profile')
    }else{
        await US.newUser(firstName, lastName, age, email, password)
        res.redirect('/home')
    }
})


route.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        res.redirect("/home");
    })
})


export default route