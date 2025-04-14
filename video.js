import express from "express";
import VideosDAO from "./DAO/VideosDAO.js";

const router = express.Router();

router.route("/addvideo").post(async (req,res) => {
    try {
        const {playbackId, viewMode, amount, assetName, creatorId} = req.body;
        
        const result = await VideosDAO.insertVideo(playbackId, viewMode, amount, assetName, creatorId);
        if(result.error) {
            return res.status(400).json({error: result.error});
        }
        return res.status(200).json({message: "Video added successfully", video: result});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message});
    }
})

router.route("/findpayinguser").get(async (req,res) => {
    try {
        const {playbackId, userId} = req.query;
        const result = await VideosDAO.findPayingUser(playbackId, userId);
        if(result.error) {
            return res.status(400).json({error: result.error});
        }
        return res.status(200).json({message: "User found", user: result});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message});
    }
})

router.route("/addpayinguser").post(async (req,res) => {
    try {
        const {playbackId, userId} = req.body;
        const result = await VideosDAO.addPayingUser(playbackId, userId);
        if(result.error) {
            return res.status(400).json({error: result.error});
        }
        return res.status(200).json({message: "User added successfully", user: result});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message});
    }
})

router.route("/deletepayinguser").delete(async (req,res) => {
    try {
        const {playbackId, userId} = req.body;
        const result = await VideosDAO.deletePayingUser(playbackId, userId);
        if(result.error) {
            return res.status(400).json({error: result.error});
        }
        return res.status(200).json({message: "User deleted successfully", user: result});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message});
    }
})

router.route("/getvideo").get(async (req,res) => {
    try {
        const {playbackId} = req.query;
        const result = await VideosDAO.getVideoByPlaybackId(playbackId);
        if(result.error) {
            return res.status(400).json({error: result.error});
        }
        return res.status(200).json({message: "Video found", video: result});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message});
    }
})

router.route("/deletevideo").delete(async (req,res) => {
    try {
        const {playbackId} = req.body;
        const result = await VideosDAO.deleteVideo(playbackId);
        if(result.error) {
            return res.status(400).json({error: result.error});
        }
        return res.status(200).json({message: "Video deleted successfully", video: result});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message});
    }
})  

export default router;