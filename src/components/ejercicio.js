import { promises as fs } from "fs"

export default class ProductManager {

    constructor() {
        this.path = "./products.txt";
        this.products = []
    }

    static id = 0

    
    
    addProduct = async (title , description , price , thumbnail , code, stock) => {

        ProductManager.id++

        let newProduct = {
            id : ProductManager.id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        this.products.push(newProduct)


        await fs.writeFile(this.path, JSON.stringify(this.products) )
    }

    readProducts = async () =>{
        let res = await fs.readFile(this.path , "utf-8")
        return JSON.parse(res)
    }

    getProducts = async () =>{
        let respuesta = await this.readProducts()
        return console.log(respuesta)
    }

    getProductsById = async (id) => {
        let respuesta1 = await this.readProducts()
        let message = typeof respuesta1 === "undefined" ? "Producto inexistente": respuesta1.find((product) => product && product.id === id) || "Producto no encontrado";
        console.log(message)
    }

    deleteProductosById = async (id) => {
        let respuesta2 = await this.readProducts();
        let filter = respuesta2.filter(products=> products.id != id)


        await fs.writeFile(this.path, JSON.stringify(filter) )
        console.log("producto eliminado")
    }

    updateProducts = async ({id, ...producto}) => {
        await this.deleteProductosById(id);
        let oldProduct = await this.readProducts()

        let modify = [{id, ...producto}, ...oldProduct]
        await fs.writeFile(this.path, JSON.stringify(modify) )
    }
}



const productos = new ProductManager()

/*  
productos.addProduct('Producto 1' , 'description 1' , 500 , "imagen1.jpg" , "123" , 10)
productos.addProduct('Producto 2' , 'description 2' , 555 , "imagen2.jpg" , "124" , 9)
productos.addProduct('Producto 3' , 'description 3' , 96500 , "imagen3.jpg" , "1671" , 2)
productos.addProduct('Producto 4' , 'description 4' , 700 , "imagen4.jpg" , "112" , 2)
productos.addProduct('Producto 5' , 'description 5' , 4500 , "imagen5.jpg" , "1171" , 2)
productos.addProduct('Producto 6' , 'description 5' , 4500 , "imagen6.jpg" , "1181" , 2)
productos.addProduct('Producto 7' , 'description 6' , 45900 , "imagen7.jpg" , "1141" , 2)
productos.addProduct('Producto 8' , 'description 7' , 4060 , "imagen9.jpg" , "12" , 2)
productos.addProduct('Producto 9' , 'description 8' , 400 , "imagen9.jpg" , "118" , 2)
productos.addProduct('Producto 10' , 'description 9' , 400 , "imagen10.jpg" , "161" , 2)  */

productos.getProducts()

/*
 //llama por id
productos.getProductsById(2)

//actualizar datos de producto
productos.updateProducts({
        id: 1,
        title: 'Producto 1',
        description: 'description 1',
        price: 7000,
        thumbnail: 'imagen1.jpg',
        code: '123',
        stock: 10
}) 
 */