import * as mongoose from "mongoose";
import {MONGO_COLLECTION_INFO} from "@/utils/resource";
import {Model, Schema} from "mongoose";

export interface IWaiting extends Document {
    name: string;
    studentId: string;
    phone: string;
    no: number;
}

const WaitingSchema = new Schema({
    name: { type: String, required: true },
    studentId: { type: String, required: true },
    phone: { type: String, required: true },
    no: { type: Number, required: true }
}, {
    collection: MONGO_COLLECTION_INFO,
    versionKey: false
})

const WaitingModel: Model<IWaiting> = (mongoose.models && mongoose.models.WaitingModel) ? mongoose.models.WaitingModel : mongoose.model<IWaiting>('WaitingModel', WaitingSchema)

export default WaitingModel