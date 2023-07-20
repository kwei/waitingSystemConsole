import {NextRequest, NextResponse} from "next/server";
import {MongoClient} from "mongodb";

export enum QueryType {
    create,
    read,
    update,
    delete
}

const MONGO_USERNAME = process.env.MONGO_USERNAME ?? ''
const MONGO_PASSWORD = process.env.MONGO_PASSWORD ?? ''
const MONGO_CLUSTER = process.env.MONGO_CLUSTER ?? ''
const MONGO_REGION = process.env.MONGO_REGION ?? ''


export async function POST(req: NextRequest, ) {
    const client = new MongoClient(`mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_CLUSTER}.${MONGO_REGION}.mongodb.net/`);

    console.log("query params: ", req.url, req.nextUrl.searchParams)
    const body = await req.json()
    console.log("body: ", body)

    const dbName = req.nextUrl.searchParams.get('db')
    const collection = req.nextUrl.searchParams.get("collection")

    console.log("DB Name: ", dbName, " & Collection: ", collection)

    const type = body["type"] as QueryType
    const query = body["query"]

    console.log("Query Object: ", query)

    if (!dbName || !collection) return NextResponse.json({ data: null })

    const dbo = client.db(dbName)
    const collections = dbo.collection(collection)

    switch (type) {
        case QueryType.create:
            return NextResponse.json({ data: null })
        case QueryType.read:
            const users = await collections.find(query).toArray().finally(()=>{
                client.close()
            })
            console.log("users: ", users)
            return NextResponse.json({ data: users })
        case QueryType.update:
            return NextResponse.json({ data: null })
        case QueryType.delete:
            return NextResponse.json({ data: null })
    }
}