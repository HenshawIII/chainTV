let Prodcuts;

export default class ProductsDAO {  
    static async injectDB(conn) {
        if (Prodcuts) {
            return;
        }
        try {
            Prodcuts = await conn.db(process.env.DB_NAME).collection("products");
        } catch (e) {
            console.error(`Unable to establish collection handles in ProductsDAO: ${e}`);
        }   
    }   

    static async addProduct(prod) {  
        try {
            const product = await Prodcuts.insertOne(prod);
            return product;
        } catch (e) {
            console.error(`Unable to add product: ${e}`);
            return {error: e};  
        }
    }

    static async getProductById(id) {   
        try {
            // console.log(id);
            const product = await Prodcuts.find({user_id: id});
           const cursor =  await product.toArray()
            // console.log(cursor);
            if (!cursor) {
                return {error: "Product not found"};
            }
            return cursor;
        } catch (e) {
            console.error(`Unable to find product: ${e}`);
            return{error: e};
        }   
    }
}