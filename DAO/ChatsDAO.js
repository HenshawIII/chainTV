let Chats;

class ChatsDAO {
    static async injectDB(conn) {
        if (Chats) {
            return;
        }
        try {
            Chats = conn.db(process.env.DB_NAME).collection("chats");
            // Chats.createIndex({ "createdAt": 1 }, { expireAfterSeconds: 3600 });
        } catch (e) {
            console.error(`Unable to establish collection handles in ChatsDAO: ${e}`);
        }
    }

    static async getChats(streamId) {
        try {
            const cursor = Chats.find({streamId: streamId});
            const chats = await cursor.toArray();
            return chats;
        } catch (error) {
            console.error(`Unable to get chats: ${error}`);
            return {error: error};
        }
    }

    static async insertChat(streamId,message,sender) {
        try {
            const result = await Chats.insertOne({streamId,message,sender});
            return result;
        } catch (error) {
            console.error(`Unable to insert chat: ${error}`);
            return {error: error};
        }
    }
}

export {ChatsDAO,Chats};