import { Schema } from "mongoose";

class AdminModel {
    initSchema(){
        const adminSchema = new Schema({
            userId: {
                type: Schema.Types.ObjectId,
                ref: "User"
            },
            examStratDate: {
                type: Date,
            },
            resultReleaseDate: {
                type: String
            },
            setting: {
            }
        },{timestamps: true})
        return adminSchema;
    }
    getAdminInstance(){
        return mongoose.model("Admin",this.initSchema())
    }
}

export default new AdminModel();
