import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import UsersDAO from "./DAO/UsersDAO.js";   
import {hashPassword,comparePass} from "./auth.js";
import authMid from "./middleware/authMid.js";
import ProductsDAO from "./DAO/ProductsDAO.js";
import cloudinary from "./cloudinary.js";
import streamsRouter from "./streams.js";
import videosRouter from "./video.js";
import {Streams} from "./DAO/StreamsDAO.js";
import {Videos} from "./DAO/VideosDAO.js";
import {Users} from "./DAO/UsersDAO.js";
import WaitlistDAO from "./DAO/WaitlistDAO.js";
import { Chats } from "./DAO/ChatsDAO.js";
import requestLogger from "./middleware/logger.js";
// import { X402PaymentHandler } from '@payai/x402-solana/server';
// import { paymentMiddleware} from "x402-express";
// import { facilitator } from "@coinbase/x402";
import {config} from "dotenv";
config();


const app = express();

// const x402 = new X402PaymentHandler({
//     network: 'solana',
//     treasuryAddress: process.env.TREASURY_WALLET_ADDRESS || 'Dh1r65uVX6qjYVMsQs2LBm23sYnkS6LpPqjXHQe6gBC2',
//     facilitatorUrl: 'https://facilitator.payai.network',
//     rpcUrl:"https://solana-mainnet.g.alchemy.com/v2/8rgdAH9Vy_zuXQFA2hedqK_a_3GAxvuZ"
//   });

app.use(cors());
app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({extended: true, limit:"50mb"}));



app.use(requestLogger);

app.get("/", (req, res) => {
    res.send("Hello World");
}); 



// app.post('/api/paid-endpoint', async (req, res) => {
//     try {
//     const paymentHeader = x402.extractPayment(req.headers);
    
//     const paymentRequirements = await x402.createPaymentRequirements({
//       price: {
//         amount: "250",  // $2.50 USDC
//         asset: {
//           address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v" // USDC devnet
//         }
//       },
//       network: 'solana',
//       config: {
//         description: 'API Request',
//         resource: `http://localhost:5300/api/paid-endpoint`,
//       }
//     });
    
//     if (!paymentHeader) {
//         console.log("Payment header not found");
//       const response = x402.create402Response(paymentRequirements);
//       console.log(response);
//       return res.status(response.status).json(response.body);
//     }
//     // console.log(JSON.stringify(paymentHeader, null, 2));
//     const verified = await x402.verifyPayment(paymentHeader, paymentRequirements);
//     if (!verified) {
//         console.log("Invalid payment");
//         console.log(verified);
//       return res.status(402).json({ error: 'Invalid payment' });
//     }
  
//     // const result = await yourBusinessLogic(req);
//     console.log("Payment successful");
//     const result = {message: "Payment successful"};
//     await x402.settlePayment(paymentHeader, paymentRequirements);
//     console.log("Payment settled");
//     return res.json(result);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({error: error.message});
//   }
// });

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

// app.post("/api/user/addsetting",async (req,res)=>{
//     try {
//         const {creatorId,logo,title,description,bgcolor,color,fontSize,fontFamily} = req.body;
//         const setting = {creatorId,logo,title,description,bgcolor,color,fontSize,fontFamily};
//         const user = await Users.findOne({creatorId: creatorId});
//         if(user){
//             return res.status(400).json({error: "User already exists"});
//         }
//         const result = await Users.insertOne({creatorId,...setting});
//         if(result.error) {
//             return res.status(400).json({error: result.error});
//         }
//         return res.status(200).json({message: "Setting added successfully"});
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({error: error.message});
//     }
// })

// app.get("/api/user/getsetting/:creatorId",async (req,res)=>{
//     try {
//         const {creatorId} = req.params;
//         const user = await Users.findOne({creatorId: creatorId});
//         if(user){
//             return res.status(200).json({setting: user});
//         }
//         return res.status(404).json({error: "Setting not found"});
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({error: error.message});
//     }
// })

// app.put("/api/user/updatesetting/:creatorId",async (req,res)=>{
//     try {
//         // const {creatorId} = req.params;
//         const {creatorId,logo,title,description,bgcolor,color,fontSize,fontFamily} = req.body;
//         // const setting = {logo,title,description,bgcolor,color,fontSize,fontFamily};
//         const result = await Users.updateOne({creatorId: creatorId},{$set: {logo,title,description,bgcolor,color,fontSize,fontFamily}});
//         if(result.error) {
//             return res.status(400).json({error: result.error});
//         }
//         return res.status(200).json({message: "Setting updated successfully"});
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({error: error.message});
//     }
// })

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

app.delete("/api/delete/products/:id/:user_id", async (req, res) => {
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

app.get('/api/creators/:creatorId/profile',async (req,res)=>{
    try {
        const {creatorId} = req.params;
        const result = await Users.findOne({creatorId});
        console.log(result);
        if(!result) {
            return res.status(400).json({error: "Creator not found"});
        }
        return res.status(200).json({profile: result});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error});
    }
})


app.post('/api/creators/:creatorId/profile',async (req,res)=>{
    try {
        const {creatorId} = req.params;
        // console.log(req.body);
        const result = await Users.insertOne({...req.body,creatorId});
        if(result.error) {
            return res.status(400).json({error: result.error});
        }
        return res.status(200).json({message: "Profile added successfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message});
    }
})

// app.put('/api/creators/:creatorId/profile',async (req,res)=>{
//     try {
//         const {creatorId} = req.params;
//         const result = await Users.updateOne({creatorId},{$set: req.body});
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({error: error.message});
//     }
// })

app.put("/api/creators/:creatorId/profile", async (req, res) => {
    try {
        const { creatorId } = req.params;
        const {_id, ...rest} = req.body;
        // First check if creator exists
        const existingCreator = await Users.findOne({ creatorId });
        if (!existingCreator) {
            return res.status(404).json({ error: "Creator not found" });
        }
        // console.log(rest);
        // Replace the entire document with new data, preserving _id and creatorId
        const result = await Users.replaceOne(
            { creatorId },
            { ...rest, _id: existingCreator._id, creatorId: creatorId }
        );

        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: "Creator not found" });
        }

        if (result.modifiedCount === 0) {
            return res.status(200).json({ message: "No changes were made" });
        }

        return res.status(200).json({ 
            message: "Creator updated successfully",
            modifiedCount: result.modifiedCount
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error });
    }
});

app.get("/api/chat/:streamId/fetch", async (req, res) => {
    try {
        const { streamId } = req.params;
        // Find all chat documents for this streamId
        const chats = await Chats.find({ streamId }).toArray();
        return res.status(200).json(chats);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
});

app.post("/api/chat/:streamId/send", async (req, res) => {
    try {
        const { streamId } = req.params;
        const { message, sender } = req.body;
        const chatDoc = {
            streamId,
            message,
            sender,
            createdAt: new Date()
        };
        const result = await Chats.insertOne(chatDoc);
        if (result.error) {
            return res.status(400).json({ error: result.error });
        }
        return res.status(200).json({ message: "Message sent successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
});

app.post("/api/waitlist",async (req,res)=>{
    try {
        const {email,name,organization} = req.body;
        const result = await WaitlistDAO.addWaitlist(email,name,organization);
        if(result.error) {
            return res.status(400).json({error: result.error});
        }
        return res.status(200).json({message: "Waitlist added successfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message});
    }
})  
// app.use("/restaurants",authMid, restRouter

// app.put("/api/addonation",async (req,res)=>{
//     try {
//         const {creatorId,amount} = req.body;
//         const strm = await Streams.updateOne({creatorId: creatorId},{$set: {donation: [...amount]}});
//         const video = await Videos.updateOne({creatorId: creatorId},{$set: {donation: [...amount]}});
//         if(strm.error || video.error) {
//             return res.status(400).json({error: strm.error || video.error});
//         }
//         return res.status(200).json({message: "Donation added successfully"});
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({error: error.message});
//     }
// })  



app.use("/api/streams",streamsRouter);
app.use("/api/videos",videosRouter);


app.all("*",(req,res)=>{
    return res.status(404).json({error: "Route not found"});
});

export default app;

