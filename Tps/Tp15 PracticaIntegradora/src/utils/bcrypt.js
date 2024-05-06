import bcrypt from 'bcrypt'

export const createHash = (passsword) => {
    return bcrypt.hashSync(passsword, bcrypt.genSaltSync(10))
}

export const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password)
}