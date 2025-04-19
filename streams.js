import express from "express";
import StreamsDAO from "./DAO/StreamsDAO.js";

const router = express.Router();

router.route("/addstream").post(async (req,res) => {
    try {
        const {playbackId,viewMode,description,amount,streamName,creatorId,logo,title,bgcolor,color,fontSize,fontFamily,donation} = req.body;

        
        const result = await StreamsDAO.insertStream(playbackId,viewMode,description,amount,streamName,creatorId,logo,title,bgcolor,color,fontSize,fontFamily,donation);
        if(result.error) {
            return res.status(400).json({error: result.error});
        }
        return res.status(200).json({message: "Stream added successfully",stream: result});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message});
    }
})

router.route("/findpayinguser").get(async (req,res) => {
    try {
        // const streamId = req.body.streamId;
        // const userId = req.body.userId;
        const {playbackId,userId} = req.query;
        const result = await StreamsDAO.findPayingUser(playbackId,userId);
        if(result.error) {
            return res.status(400).json({error: result.error});
        }
        return res.status(200).json({message: "User found",user: result});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message});
    }

})

router.route("/addpayinguser").post(async (req,res) => {
    try {
        const {playbackId,userId} = req.body;
        const result = await StreamsDAO.addPayingUser(playbackId,userId);
        if(result.error) {
            return res.status(400).json({error: result.error});
        }
        return res.status(200).json({message: "User added successfully",user: result});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message});
    }
})

router.route("/deletepayinguser").delete(async (req,res) => {
    try {
            const {playbackId,userId} = req.body; 
        const result = await StreamsDAO.deletePayingUser(playbackId,userId);
        if(result.error) {
            return res.status(400).json({error: result.error});
        }
        return res.status(200).json({message: "User deleted successfully",user: result});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message});
    }
})  

router.route("/getstream").get(async (req,res) => {
    try {
        const {playbackId} = req.query;
        const result = await StreamsDAO.getStreamByPlaybackId(playbackId);
        if(result.error) {
            return res.status(400).json({error: result.error});
        }
        return res.status(200).json({message: "Stream found",stream: result});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message});
    }
})  

router.route("/deletestream").delete(async (req,res) => {
    try {
        const {playbackId} = req.body;
        const result = await StreamsDAO.deleteStream(playbackId);
        if(result.error) {
            return res.status(400).json({error: result.error});
        }
        return res.status(200).json({message: "Stream deleted successfully",stream: result});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message});
    }
})

export default router;