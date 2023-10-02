class ProductManager {

    constructor() {
        this.products = []
    }

    getId = () => {
        const count = this.products.length
        if (count === 0) return 1

        const lastProduct = this.products[count-1]

        return lastProduct.id + 1
    }



    addProduct (title , description , price , thumbnail , code, stock){

    if (!title || !description || !price || !thumbnail || !code || stock === undefined){
        console.log("Todos los campos son requeridos");
        return;
    }

            if(this.products.some(product => product.code === code)){
                console.log(`El codigo ${code} esta repetido`);
                return;
            }
        
        
        const id = this.getId()


        this.products.push({
            id,
            title, 
            description, 
            price ,
            thumbnail ,
            code ,
            stock
        })

    }

    getProduct (){
        return this.products
    }

    // Producto id
    exist (id) {
        return this.products.find((producto) => producto.id === id);
    }

    getProductById(id) {
        !this.exist(id) ? console.log ("not found") : console.log (this.exist(id));
    }

}



const productos = new ProductManager()
console.log((productos.getProduct()))

//Productos
productos.addProduct('Producto 1' , 'desc' , 500 , "imagen.jpg" , "123" , 10)
productos.addProduct('Producto 2' , 'desc' , 700 , "imagen.jpg" , "111" , 15)
productos.addProduct('Producto 3' , 'desc' , 800 , "imagen.jpg" , "125" , 25 )


// Productos agregados
console.log((productos.getProduct()))


//Code repetido 
productos.addProduct('Producto 4' , 'desc' , 800 , "imagen.jpg" , "111", 4 )


 //Busca producto por su ID
productos.getProductById(2); 

