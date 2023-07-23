import {NextRequest, NextResponse} from "next/server";
import mongoose from "mongoose";
import AccountModel from "@/models/Account";
import {MONGO_DB_NAME} from "@/utils/resource";


export enum QueryType {
    create,
    read,
    findAll,
    update,
    delete
}

const MONGO_USERNAME = process.env.MONGO_USERNAME ?? ''
const MONGO_PASSWORD = process.env.MONGO_PASSWORD ?? ''
const MONGO_CLUSTER = process.env.MONGO_CLUSTER ?? ''
const MONGO_REGION = process.env.MONGO_REGION ?? ''


export async function POST(req: NextRequest, ) {
    const body = await req.json()
    const type = body["type"] as QueryType
    const query = body["query"]
    const data = body["data"]

    console.log("Query Type: ", type)
    console.log("Query Object: ", query)
    console.log("Data Object: ", data)

    try {
        await mongoose.connect(`mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_CLUSTER}.${MONGO_REGION}.mongodb.net/${MONGO_DB_NAME}`)

        switch (type) {
            case QueryType.create:
                await AccountModel.create(data)
                return NextResponse.json({ success: true, message: 'success', data: [data] })
            case QueryType.read:
                const user = await AccountModel.findOne(query)
                console.log("user: ", user)
                return NextResponse.json({ success: true, message: 'success', data: [user] ?? [] })
            case QueryType.findAll:
                const users = await AccountModel.find(query)
                console.log("users: ", users)
                return NextResponse.json({ success: true, message: 'success', data: users ?? [] })
            case QueryType.update:
                return NextResponse.json({ success: true, message: 'success', data: [] })
            case QueryType.delete:
                return NextResponse.json({ success: true, message: 'success', data: [] })
        }
    } catch (e) {
        console.log(e)
        return NextResponse.json({ success: false, message: e, data: [] })
    }

    // const dbo = client.db(dbName)
    // const collections = dbo.collection(collection)
    //
    // switch (type) {
    //     case QueryType.create:
    //         return NextResponse.json({ data: null })
    //     case QueryType.read:
    //         const users = await collections.find(query).toArray().finally(()=>{
    //             client.close()
    //         })
    //         console.log("users: ", users)
    //         return NextResponse.json({ data: users })
    //     case QueryType.update:
    //         return NextResponse.json({ data: null })
    //     case QueryType.delete:
    //         return NextResponse.json({ data: null })
    // }
}