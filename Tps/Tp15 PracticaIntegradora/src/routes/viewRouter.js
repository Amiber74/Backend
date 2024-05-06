import { Router } from "express";

const route = Router()

route.get('/', (req, res) => {
    res.redirect('/home')
})

route.get('/home', (req, res) => {
    const err = req.query.err
    res.render('index', {
        title:'Eccomerce',
        err
    })
})

route.get('/profile', (req, res) => {
    res.render('profile',{
        title:'Perfil'
    })

})

export default route