import {expect} from 'chai'
import superTest from 'supertest'
import userModel from '../models/userModel.js'


const requester = superTest('http://localhost:8080')

describe('Testeo de API', () => {
    describe('Test de Usuarios', () => {
        let cookie
        it('Registro de usuario', async () => {
            
            const result = await requester.post('/api/user/register').send({
                firstName: 'Ines',
                lastName: 'Correa',
                email: 'a@b.com',
                password: '123456',
                phone:'123'
            })
            
            expect(result.body).to.be.ok
        })
    
        it('Logeo de usuario y devuelve una cookie', async () => {
            const result = await requester.post('/api/user/login').send({
                email:'rojas.facundo2002@gmail.com',
                password:'123'
            })
    
            const Cookies = result.headers['set-cookie'][0]
            expect(Cookies).to.be.ok
            cookie = {
                name: Cookies.split('=')[0],
                value: Cookies.split('=')[1]
            }
            
            expect(cookie.name).to.be.ok.and.eq('user')
            expect(cookie.value).to.be.ok
    
        })
    
        it('logout y eliminacion de cookie', async () => {
            const result = await requester.get('/api/user/logout')
            const Cookies = result.headers['set-cookie'][0]
            cookie = {
                name: Cookies.split('=')[0],
                value: Cookies.split('=')[0] = '; Path'? 'false' : Cookies.split('=')[0]
            }
            expect(cookie.name).to.be.ok.and.eq('user')
            expect(cookie.value).to.be.eq('false')
        })
    })

    describe('testeo de cart', () => {



    })


})