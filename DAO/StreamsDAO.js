export let Streams ;

export default class StreamsDAO {
    static async injectDB(conn) {
        if (Streams) {
            return;
        }
        try {
        Streams = conn.db(process.env.DB_NAME).collection("streams");            
        } catch (e) {
            console.error(`Unable to establish collection handles in StreamsDAO: ${e}`);
        }
    }

    static async getStreams(){

        try {
            const cursor = Streams.find({});
            const streams = await cursor.toArray();
            return streams;
        } catch (error) {
            console.error(`Unable to get streams: ${error}`);
            return {error: error};
        }
    }

    static async insertStream(playbackId,viewMode,description,amount,streamName,creatorId,logo,title,bgcolor,color,fontSize,fontFamily,donation) {
        try {
            
            const stream =  await Streams.insertOne({
                playbackId,
                viewMode,
                description,
                amount,
                streamName,
                creatorId,
                Users:[],
                logo,
                title,
                bgcolor,
                color,
                fontSize,
                fontFamily,
                donation,
            });
            return stream;


        } catch (error) {
            console.error(`Unable to insert stream: ${error}`);
            return {error: error};
        }
    }

    static async addPayingUser(playbackId, userId) {

        try {
            // const stream = await Streams.findOne({_id: new ObjectId(streamId)});
            // const user = await Users.findOne({_id: new ObjectId(userId)});
            const User = await Streams.updateOne({playbackId},{$push:{Users:userId}});
            return User;
        } catch (error) {
            console.error(`Unable to add paying user: ${error}`);
            return {error: error};
        }
    }

    static async findPayingUser(playbackId,userId) {
        try {
            // const User = await Streams.
            const User = await Streams.findOne({playbackId,Users:userId});
            if(!User) {
                return {error: "User not found"};
            }
            return User;
        } catch (error) {
            console.error(`Unable to find paying user: ${error}`);
            return {error: error};
        }
    }

    static async deletePayingUser(playbackId,userId) {
        try {
            const delUser = await Streams.updateOne({playbackId},{$pull:{Users:userId}}); 
            if(!delUser) {
                return {error: "User not found"};
            }
            return delUser;
        } catch (error) {
            console.error(`Unable to delete paying user: ${error}`);
            return {error: error};
        }
    }   

    static async getStreamByPlaybackId(playbackId) {
        try {
            const stream = await Streams.findOne({playbackId});
            if(!stream) {
                return {error: "Stream not found"};
            }
            return stream;

        } catch (error) {
            console.error(`Unable to get stream by playbackId: ${error}`);  
            return {error: error};
        }
    }

    static async deleteStream(playbackId) {
        try {
            const stream = await Streams.deleteOne({playbackId});
            return stream;
        } catch (error) {
            console.error(`Unable to delete stream: ${error}`);
            return {error: error};
        }
    }   
}