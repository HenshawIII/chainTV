import app from "./server.js";
import dotenv from "dotenv";
import { MongoClient,ServerApiVersion } from "mongodb";
import UsersDAO from "./DAO/UsersDAO.js";
import ProductsDAO from "./DAO/ProductsDAO.js";
import StreamsDAO from "./DAO/StreamsDAO.js";
import VideosDAO from "./DAO/VideosDAO.js";

dotenv.config();

const uri = process.env.MONGODB_URI;

MongoClient.connect(uri).then(async (client) => {
   try {
    await VideosDAO.injectDB(client);
    await UsersDAO.injectDB(client);
    await ProductsDAO.injectDB(client);
    await StreamsDAO.injectDB(client);
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
   } catch (error) {
    console.log(error);
   }
    
})
