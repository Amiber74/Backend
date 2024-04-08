import userServices from "../services/userService.js"
const US = new userServices()

export const authorization = (role) => {
    return async (req, res, next) => {
        const id = req.cookies['user']
        if(!id){return res.status(401).send({error:'Unauthorized'})}
        const user = await US.getDtoUser(id)
        if(!(user.role==role)){return res.status(403).send({error:'Not Permissions'})}
        return next()
    }
} 
