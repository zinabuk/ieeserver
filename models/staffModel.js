import {Schema} from "mongoose"
class StaffModel{
    init(){
        const staffSchema = new Schema({
            userId: {
                type: Schema.Types.ObjectId,
                ref: "User"
            },
           courseId:{
            type: Schema.Types.ObjectId,
            ref: "Course"
           },
           role: ['verifier','ideal']
        })

        return staffSchema;
    }
    getStaffInstance(){
        return mongoose.model("Staff", this.init())
    }
}

export default new StaffModel();
