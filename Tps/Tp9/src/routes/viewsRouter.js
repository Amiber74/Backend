import { Router } from "express";
import userService from "../services/userService.js";

const route = Router()
const US = new userService ()

route.get('/',(req, res) => {

    res.redirect('/home')

})

route.get('/home', (req, res) => {
    
    res.render('home', {style:'home.css'})

    if(req.session.user){
        res.redirect('/profile')
    }

})

route.get("/profile", async (req, res) => {

    if(req.session.user){

        let user = await US.userByID(req.session.user);
        res.render("profile", {user});

    } else {
        res.redirect("/home");
    }

})

route.get('/register', (req, res) => {

    res.render('home')

})


export default route
