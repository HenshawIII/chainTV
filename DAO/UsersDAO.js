export let Users ;

export default class UsersDAO {
    static async injectDB(conn) {
        if (Users) {
            return;
        }
        try {
            Users = await conn.db(process.env.DB_NAME).collection("users");
        } catch (e) {
            console.error(`Unable to establish collection handles in UsersDAO: ${e}`);
        }   
    }

    static async addUser(email,name, password) {
        try {
            const ifUser = await Users.findOne({email});
            // console.log(ifUser);
            if (ifUser) {
                return {error: "User already exists,Kindly login"};
            }
            const user = await Users.insertOne({email, name, password});
            return user;
        } catch (e) {
            console.error(`Unable to add user: ${e}`);
            return {error: e};  
        }
    }

    static async deleteUser(email) {    
        try {
            const user = await Users.deleteOne({email});
            return{ user, message: "User deleted successfully"};
        } catch (e) {
            console.error(`Unable to delete user: ${e}`);
            return{message: e};
        }
    }

    static async findUserByEmail(email) {
        try {
            const user = await Users.findOne({email});
            if (!user) {
                return {error: "User not found"};
            }
            return user;
        } catch (e) {
            console.error(`Unable to find user: ${e}`);
            return{error: e};
        }   
    }   
}