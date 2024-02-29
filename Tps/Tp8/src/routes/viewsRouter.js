import Router from "express";
import userService from "../Services/userService.js";
import productService from '../Services/productService.js'

const US = new userService()
const PS = new productService()
const router = Router()

router.get('/', (req, res) => {
    res.redirect('/home');
});

router.get('/home', async (req, res) => {
    const prods = await PS.getProducts()

    if(req.session.user){
        res.redirect("/profile");
    } else {
        res.render("home", {style:'index.css',prods});
    }

});

router.get('/register', (req, res) => {
    res.render("register");
});

router.post('/', async (req, res) => {
    const { title, price, description, code } = req.body

    await PS.newProduct(title, price, description, code)
    
    const prods = await PS.getProducts()

    res.render("home",{style:'index.css', prods})

})

router.get("/login", (req, res) => {

    if(req.session.user){
        res.redirect("/profile");
    } else {
        res.render("login", {Err:req.session.Err});
    }

})

router.get("/profile", async (req, res) => {

    const prods = await PS.getProducts()

    if(req.session.user){

        let user = await US.userByID(req.session.user);
        user.isAdmin = user.role =='admin' ? true : false
        res.render("profile", {user, prods});

    } else {
        res.redirect("/login");
    }

})

export default router;