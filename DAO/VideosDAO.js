export let Videos ;

export default class VideosDAO {
    static async injectDB(conn) {
        if(Videos) {
            return;
        }
        try {
                Videos = await conn.db(process.env.DB_NAME).collection("videos");
        } catch (error) {
            console.error(`Unable to establish collection handles in VideosDAO: ${error}`);
        }
    }

    static async getVideos() {
        try {
            const cursor = Videos.find({});
            const videos = await cursor.toArray();
            return videos;
        } catch (error) {
            console.error(`Unable to get videos: ${error}`);
            return {error: error};
        }
    }

    static async insertVideo(playbackId, viewMode, amount, assetName, creatorId) {
        try {
            const video = await Videos.insertOne({
                playbackId,
                viewMode,
                amount,
                assetName,
                creatorId,
                Users: []
            });
            return video;
        } catch (error) {
            console.error(`Unable to insert video: ${error}`);
            return {error: error};
        }
    }

    static async addPayingUser(playbackId, userId) {
        try {
            const User = await Videos.updateOne({playbackId}, {$push: {Users: userId}});
            return User;
        } catch (error) {
            console.error(`Unable to add paying user: ${error}`);
            return {error: error};
        }
    }

    static async findPayingUser(playbackId, userId) {
        try {
            const User = await Videos.findOne({playbackId, Users: userId});
            if(!User) {
                return {error: "User not found"};
            }
            return User;
        } catch (error) {
            console.error(`Unable to find paying user: ${error}`);
            return {error: error};
        }
    }

    static async deletePayingUser(playbackId, userId) {
        try {
            const delUser = await Videos.updateOne({playbackId}, {$pull: {Users: userId}});
            if(!delUser) {
                return {error: "User not found"};
            }
            return delUser;
        } catch (error) {
            console.error(`Unable to delete paying user: ${error}`);
            return {error: error};
        }
    }

    static async getVideoByPlaybackId(playbackId) {
        try {
            const video = await Videos.findOne({playbackId});
            if(!video) {
                return {error: "Video not found"};
            }
            return video;
        } catch (error) {
            console.error(`Unable to get video by playbackId: ${error}`);
            return {error: error};
            }
    }

    static async deleteVideo(playbackId) {
        try {
            const video = await Videos.deleteOne({playbackId});
            if(!video) {
                return {error: "Video not found"};
            }
            return video;
        } catch (error) {
            console.error(`Unable to delete video: ${error}`);
            return {error: error};
        }
    }   
}   
