import { Router } from "express";
import userService from '../services/userService.js'

const route = Router()
const US = new userService()


route.get('/ping', (req, res) => {
    res.send('pong')
})

route.post('/login', async (req, res) => {

    const {email, pass} =req.body
    
    if(!email || !pass){
        return res.redirect('/home')
    }
    const password = await US.getHash(pass)
    console.log(password);
    const user = await US.UserByCreds(email, password)

    if(user){
        console.log('true');
        req.session.user = user._id
        res.redirect('/profile')
    } else {
        console.log('false');
        res.redirect('/home')
    }

})

route.post('/register', async (req, res) => {

    const {firstName, lastName, email, age, password} = req.body
    parseInt(age)
    
    // console.log(req.body);
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