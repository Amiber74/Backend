import {Router} from "express";
import userService from "../Services/userService.js";
import productService from "../Services/productService.js";

const US = new userService()
const PS = new productService()
const router = Router()

router.post("/register", async (req, res) => {

    const {firstName, lastName, email, age, password} = req.body
    parseInt(age)
    

    if(!firstName || !lastName || !email || !age || !password){
        res.redirect("/register");
    }

    let emailUsed = await US.UserByEmail(email);

    if(emailUsed){
        res.redirect("/register");
    } else {
        await US.newUser(firstName, lastName, age, email, password)
        res.redirect("/login");
    }

})

router.post("/login", async (req, res) => {

    const {email, password} = req.body
    req.session.Err = false
    if(!email || !password){
        req.session.Err = true
        return res.redirect(`/login`);
    }
    const pass = US.getHash(password)
    const user = await US.UserByCreds(email, pass);
    
    if(!user){
        req.session.Err = true
        res.redirect("/login");
    } else {
        req.session.user = user._id;
        res.redirect("/profile");
    }

})
router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        res.redirect("/home");
    })
})

export default router;