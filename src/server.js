import express from "express"
import ProductManager from "./components/ejercicio.js"

const app = express();
app.use(express.urlencoded({extended:true}))

const productos = new ProductManager()
const readProducts = productos.readProducts()

app.get('/products' , async (req,res) => {

    let limite = parseInt(req.query.limite);

    if(!limite) return res.send(await readProducts)

    let allProducts = await readProducts
    let productsLimite = allProducts.slice(0, limite)
    res.send(productsLimite)
});

app.get("/products/:id" , async (req,res ) => {
    let id = parseInt(req.params.id)
    let allProducts = await readProducts;
    let productById = allProducts.find(producto => producto.id === id)
    res.send(productById)
    
})

const puerto = 8080;
const server = app.listen(puerto , () => {
    console.log(`Express ${server.address().port}`)
})

server.on("error", (error) => console.log(`error del servidor ${error}`))


/*
pruebas en navegador 

todos los productos

http://localhost:8080/products

producto con id : 6
http://localhost:8080/products/6

*/