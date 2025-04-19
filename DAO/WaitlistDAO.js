let Waitlist;

export default class WaitlistDAO {
    static async injectDB(conn) {
        if (Waitlist) {
            return;
        }
        try {
            Waitlist = await conn.db(process.env.DB_NAME).collection("waitlist");
        } catch (e) {
            console.error(`Unable to establish collection handles in userDAO: ${e}`);
        }
    }

    static async addWaitlist(email,name,organization) {
        try {
            const waitlist = await Waitlist.insertOne({email,name,organization});
            return waitlist;
        } catch (e) {
            console.error(`Unable to add waitlist: ${e}`);
        }
    }
}