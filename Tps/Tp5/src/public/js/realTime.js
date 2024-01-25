const socket = io()
const ProdContainer = document.getElementById('Products')
const Button = document.getElementById('submit')
const nameInput = document.getElementById('name')
const codeInput = document.getElementById('code')
const priceInput = document.getElementById('price')
const stockInput = document.getElementById('stock')

const CodeRem = document.getElementById('codeRem')
const ButtonRem = document.getElementById('submitRem')


Button.addEventListener('click',()=>{
    const Prod={
        name: nameInput.value,
        code: codeInput.value,
        price: priceInput.value,
        stock: stockInput.value
    }
    socket.emit('Product',Prod)

    nameInput.value=''
    codeInput.value=''
    priceInput.value=''
    stockInput.value=''
})

socket.on('Prod', data => {
    console.log(data)

    const prods = data.map( prod => {
        return `<p> Nombre: ${prod.name} <br> Code: ${prod.code} <br> Precio: ${prod.price} <br> Stock: ${prod.stock} </p>`
    }).join('')
    ProdContainer.innerHTML = prods
})


ButtonRem.addEventListener('click', ()=>{

    const code = CodeRem.value
    socket.emit('Remove',code)

    CodeRem.value=''
})
