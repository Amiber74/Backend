import {expect} from 'chai'
import superTest from 'supertest'

const requester = superTest('http://localhost:8080')

describe('Testing App', () => {

    it('Test de register /api/user/register', async () => {

        const result = await requester.post('/api/user/register').send({
            firstName: 'Ines',
            lastName: 'Correa',
            email: 'a@b.com',
            password: '123456'
        })
        console.log(result.payload);
        console.log(result.body);
        console.log(result.ok);
        expect(result.payload).to.be.ok

    })

})
