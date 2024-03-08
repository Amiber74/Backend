import bcrypt from 'bcrypt'

export const creatHash = (passsword) => {
    return bcrypt.hashSync(passsword, bcrypt.genSaltSync(10))
}

export const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password)
}