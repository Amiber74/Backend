import { faker } from '@faker-js/faker'

// faker.locale = 'es' // Locale en español

const generateProduct = () => {
    return {
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        stock: faker.number.int(),
        id: faker.database.mongodbObjectId(),
        image: faker.image.avatar()
    }
}

export default generateProduct