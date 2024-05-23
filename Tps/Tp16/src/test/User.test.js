import mongoose from 'mongoose'
import {userServices} from '../services/userServices.js'
import Assert from 'assert'
import { logger } from '../utils/loggers.js'

mongoose.connect('mongodb://127.0.0.1:27017/Tp15')
const assert = Assert.strict

describe('Testing de userServices', () => {
    //Se usa funcion() porque al hacer this. se enlaza a la funcion describe, es decir que este dentro del scope del describe
    before(function (){ //Se inicializa antes del test
        this.userDao = new userServices()
    })
    beforeEach(function () {
        mongoose.connection.collections.users.drop()
        this.timeout = 5000
    })

    it('El getAll debe devolver un array', async function() {
        const result = await this.userDao.getAllUser()  
        assert.strictEqual(Array.isArray(result), true)
    })
})