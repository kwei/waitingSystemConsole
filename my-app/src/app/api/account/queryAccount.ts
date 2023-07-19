import {MONGO_COLLECTION_ACCOUNT, MONGO_DB_NAME} from "@/utils/resource";

const dev = process.env.NODE_ENV !== 'production'
const BASE_URL = dev ? 'http://localhost:3000' : 'https://waitingSystemConsole.vercel.app'

const apiUrl = `${BASE_URL}/api/account?db=${MONGO_DB_NAME}&collection=${MONGO_COLLECTION_ACCOUNT}`

export function queryAccount<T>(params: Record<string | number, T>) {
    return fetch(apiUrl, {
        method: "GET",
        body: JSON.stringify({
            query: params
        })
    }).then(res => {
        if (res.ok) return res.json()
        throw res.statusText
    }).then(res => (
        res[0]
    )).catch(e => {
        console.error(e)
        return null
    })
}