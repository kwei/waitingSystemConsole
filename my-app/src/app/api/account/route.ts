import {NextApiRequest, NextApiResponse} from "next";
import { NextRequest, NextResponse } from "next/server";
import {MongoClient} from "mongodb";

const MONGO_USERNAME = process.env.MONGO_USERNAME ?? ''
const MONGO_PASSWORD = process.env.MONGO_PASSWORD ?? ''
const MONGO_CLUSTER = process.env.MONGO_CLUSTER ?? ''
const MONGO_REGION = process.env.MONGO_REGION ?? ''

const MONGO_URI = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_CLUSTER}.${MONGO_REGION}.mongodb.net/?retryWrites=true&w=majority`

export async function GET(req: NextApiRequest, res: NextApiResponse<string>) {
    console.log("uri",MONGO_URI)
    const client = new MongoClient(MONGO_URI);

    const dbName = req.query["db"] as string
    const collection = req.query["collection"] as string

    console.log("DB Name: ", dbName, " & Collection: ", collection)

    const reqJsonObj = JSON.parse(req.body)
    const query = reqJsonObj["query"]

    console.log("Query Object: ", query)

    const dbo = client.db(dbName)
    const collections = dbo.collection(collection)
    const users = await collections.find(query).toArray().finally(()=>{
        client.close()
    })

    return NextResponse.json({ data: users })
}

export async function POST(req: NextRequest, res: NextApiResponse<string>) {
    return NextResponse.json({ data: 'test api'})
}

export async function UPDATE(req: NextRequest, res: NextApiResponse<string>) {
    return NextResponse.json({ data: 'test api'})
}

export async function DELETE(req: NextRequest, res: NextApiResponse<string>) {
    return NextResponse.json({ data: 'test api'})
}