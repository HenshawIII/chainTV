import { ObjectId } from "mongodb";

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
            console.log(product);
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

    static async updateProduct( user_id, product) {
        try {
            const updateResult = await Prodcuts.updateOne({_id: new ObjectId(product.id),user_id: user_id}, {$set: {
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl,
                description: product.description,
                quantity: product.quantity,
                currency: product.currency
            }});
            return updateResult;
        } catch (e) {
            console.error(`Unable to update product: ${e}`);    
            return {error: e};
        }
    }

    static async deleteProduct(id,user_id) {
        try {
            console.log(id,user_id);
            const deleteResult = await Prodcuts.deleteOne({_id: new ObjectId(id),user_id: user_id});
            console.log(deleteResult);
            return deleteResult;
        } catch (e) {
            console.error(`Unable to delete product: ${e}`);    
            return {error: e};
        }
    }
    

}