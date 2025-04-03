import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import UsersDAO from "./DAO/UsersDAO.js";   
import {hashPassword,comparePass} from "./auth.js";
import authMid from "./middleware/authMid.js";
import ProductsDAO from "./DAO/ProductsDAO.js";
import cloudinary from "./cloudinary.js";

const app = express();

app.use(cors());
app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({extended: true, limit:"50mb"}));

app.get("/", (req, res) => {
    res.send("Hello World");
}); 

app.post("/api/auth/register", async (req, res) => {
   try {
    //   console.log(req.body);
    let {email, name, password} = req.body;
    password = await hashPassword(password);
    const user = await UsersDAO.addUser(email, name, password);
    console.log(user.insertedId);
    if(user.error) {
        return  res.status(400).json({error: user.error});
    }
    const token = jwt.sign({userId: user.insertedId}, process.env.JWT_SECRET,{expiresIn: "1h"});
  return  res.status(201).json({user: user.insertedId, token});
} catch (e) {
    return res.status(500).json({message: e.message});
}
});

app.post("/login", async (req, res) => {
    try {
        let {email, password} = req.body;
        const user = await UsersDAO.findUserByEmail(email);
        if(user.error) {
           return res.status(400).json({error: user.error});
        }   
        // console.log(user._id);
        const pass = await comparePass(password, user.password);
        if(pass) {
            const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET,{expiresIn: "1h"});
           return res.status(200).json({message: "Login successful", token,user});
        } else {
          return res.status(401).json({error: "Invalid password"});
        }
    } catch (e) {
       return res.status(500).json({message: e.message});
    }
})  


app.get("/api/:user_id/products",async (req, res) => { 
   try {
    const {user_id} = req.params;
    // console.log(id);
    // res.send(`Product with id ${id}`);
    const result = await ProductsDAO.getProductById(user_id);
    if(result.error) {
        return res.status(400).json({error: result.error});
    }   
    if(result.length === 0) {
        return res.status(404).json({error: "Product not found"});
    }
    return res.status(200).json({product: result});
   } catch (error) {
    console.log(error);
    return res.status(500).json({error: error.message});
   }
})

app.post("/api/post/products", async (req, res) => {
    try {
        const {name,user_id, price,imageUrl,description,quantity,currency} = req.body;
    // console.log(name, price,image,quantity,currency);
    // const imgResult = await cloudinary.uploader.upload(imageUrl,{
       
    //     public_id: `${user_id}-${name}-${Date.now()}`,
    //     allowed_formats: ["jpg","png","jpeg","gif","svg","webp"],
    //     folder: "products",
    //     transformation: [{width: 500, height: 500, crop: "limit"}],

    // },(error,result)=>{
    //     if(error){
    //         return res.status(400).json({error: error.message});
    //     }
    //     console.log(result.secure_url);
    // });
    const product = {name,user_id, price,imageUrl,description,quantity,currency};
        const result = await ProductsDAO.addProduct(product);
        if(result.error) {
            return res.status(400).json({error: result.error});
        }
       return res.status(201).json({message: "Product added successfully"});
    } catch (error) {
        console.log(error)
       return res.status(500).json({error: error.message});
    }
})

app.put("/api/update/products/:user_id", async (req, res) => {      
    try {
        const {user_id} = req.params;
        const {name, price,imageUrl,description,quantity,currency,id} = req.body;
        const product = {name, price,imageUrl,description,quantity,currency,id};
        const result = await ProductsDAO.updateProduct( user_id, product);
        if(result.error) {
            return res.status(400).json({error: result.error});
        }
        return res.status(200).json({message: "Product updated successfully"});
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error.message});
    }
})

app.delete("/api/delete/products/:id/:user_id   ", async (req, res) => {
    try {
        const {id,user_id} = req.params;
        const result = await ProductsDAO.deleteProduct(id,user_id);
        if(result.error) {
            return res.status(400).json({error: result.error});
        }
        return res.status(200).json({message: "Product deleted successfully"});
    } catch (error) {
        console.log(error)
    }   
})
// app.use("/restaurants",authMid, restRouter);




export default app;
