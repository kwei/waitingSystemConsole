import * as mongoose from "mongoose";
import {MONGO_COLLECTION_ACCOUNT} from "@/utils/resource";
import {Model, Schema} from "mongoose";

interface IAccount extends Document {
    name: string;
    password: string;
    createDate: string;
    lastUpdateDate: string;
    admin: boolean;
}

const AccountSchema = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    createDate: { type: String, required: true },
    lastUpdateDate: { type: String, required: true },
    admin: { type: Boolean, required: false }
}, {
    collection: MONGO_COLLECTION_ACCOUNT,
    versionKey: false
})

const AccountModel: Model<IAccount> = (mongoose.models && mongoose.models.AccountModel) ? mongoose.models.AccountModel : mongoose.model<IAccount>('AccountModel', AccountSchema)

export default AccountModel