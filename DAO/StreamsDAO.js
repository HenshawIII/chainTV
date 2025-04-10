let Streams ;

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

    static async insertStream(streamId,streamPrice,creatorId) {
        try {
            
            const stream =  await Streams.insertOne({
                streamId,
                streamPrice,
                Users:[],
                creatorId,
            });
            return stream;


        } catch (error) {
            console.error(`Unable to insert stream: ${error}`);
            return {error: error};
        }
    }

    static async addPayingUser(streamId, userId) {

        try {
            // const stream = await Streams.findOne({_id: new ObjectId(streamId)});
            // const user = await Users.findOne({_id: new ObjectId(userId)});
            const User = await Streams.updateOne({streamId},{$push:{Users:userId}});
            return User;
        } catch (error) {
            console.error(`Unable to add paying user: ${error}`);
            return {error: error};
        }
    }

    static async findPayingUser(streamId,userId) {
        try {
            // const User = await Streams.
            const User = await Streams.findOne({streamId,Users:userId});
            if(!User) {
                return {error: "User not found"};
            }
            return User;
        } catch (error) {
            console.error(`Unable to find paying user: ${error}`);
            return {error: error};
        }
    }

    static async deletePayingUser(streamId,userId) {
        try {
            const delUser = await Streams.updateOne({streamId},{$pull:{Users:userId}}); 
            if(!delUser) {
                return {error: "User not found"};
            }
            return delUser;
        } catch (error) {
            console.error(`Unable to delete paying user: ${error}`);
            return {error: error};
        }
    }   
}