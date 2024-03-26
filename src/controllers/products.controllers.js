
import { CustomError } from "../errors/CustomError.js";
import { EErrorrs } from "../errors/enums.js";
import { generateProductErrorInfo } from "../errors/info.js";
import { ProductDao } from "../daos/factory.js";


export class ProductControllers{
    constructor(){
        this.productService = new ProductDao()
    }


//TRAER TODOS LOS PRODUCTOS
    getProducts = async (req, res) => {

        try {
        
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;
        const sort = req.query.sort || 'none';
        const query = req.query.query || '';
        
        
        const options = {
            page,
            limit,
            sort: sort === 'none' ? {} : { price: sort === 'asc' ? 1 : -1 },
        };
        
        
        const filter = query ? { title: new RegExp(query, 'i') } : {};
        
        
        const result = await this.productService.paginate(filter, options);
        
        res.json({
            total: result.totalDocs,
            limit: result.limit,
            page: result.page,
            sort,
            query,
            products: result.docs,
        });
        req.logger.info(`Obtener productos - Página: ${page}, Límite: ${limit}, Orden: ${sort}, Búsqueda: ${query}`);
    } catch (error) {
        // Manejar errores y registrarlos
        req.logger.error("Error al obtener los productos:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
        
        
//TRAER UN PRODUCTO
    getProduct =  async (req, res) => {

        const { pid } = req.params;
        
        try {
        const product = await this.productService.getProduct(pid);
        res.send(product);
        req.logger.info(`Obtener producto con ID: ${pid}`);
    } catch (error) {
        // Manejar errores y registrarlos
        req.logger.error(`Error al obtener el producto con ID ${pid}:`, error);
        res.status(500).send("Error interno del servidor");
    }
}
//CREAR UN PRODUCTO
createProduct = async (req, res, next) => {
    try {
        const { title, description, price, thumbnail, code, stock, status = true, category } = req.body;

        // Verificar si algún campo es nulo o indefinido
        if (!title || !description || !price || !thumbnail || !code || !stock || !category) {
            CustomError.createError({
                name: "Products creation error",
                cause: generateProductErrorInfo({
                    title,
                    description,
                    price,
                    thumbnail,
                    code,
                    stock,
                    status,
                    category
                }),
                message: "Error creating a product",
                code: EErrorrs.INVALID_TYPE_ERROR
            });
        }

        const productNew = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            status,
            category,
        };

        const createdProduct = await this.productService.createProduct(productNew);
        res.status(200).json({ success: true, message: 'Producto creado exitosamente', product: createdProduct });
    } catch (error) {
        next(error);
    }
}


//ACTUALIZAR UN PRODUCTO
    updateProduct =async (req, res) => {

        const { pid } = req.params;
        
        const productToUpdate = req.body;
        
        try {
        const result = await this.productService.updateProduct(pid, productToUpdate);
        res.send(result);
        req.logger.info(`Actualizar producto con ID: ${pid}`, productToUpdate);
    } catch (error) {
        // Manejar errores y registrarlos
        req.logger.error(`Error al actualizar el producto con ID ${pid}:`, error);
        res.status(500).send("Error interno del servidor");
    }
}
//ELIMINAR UN PRODUCTO
    deletProduct = async (req, res) => {

        const { pid } = req.params;
        
        try {
        const result = await this.productService.deleteProduct(pid);
        res.send(result);
        req.logger.info(`Eliminar producto con ID: ${pid}`);
    } catch (error) {
        // Manejar errores y registrarlos
        req.logger.error(`Error al eliminar el producto con ID ${pid}:`, error);
        res.status(500).send("Error interno del servidor");
    }
}
}