import {BASE_URL} from "@/app/api/source";
import {MONGO_COLLECTION_ACCOUNT, MONGO_DB_NAME} from "@/utils/resource";
import {QueryType} from "@/app/api/account/route";


export function updateAccount<T, D>(params: T, data: D): Promise<boolean> {
    return fetch(`${BASE_URL}/api/account?db=${MONGO_DB_NAME}&collection=${MONGO_COLLECTION_ACCOUNT}`, {
        method: "POST",
        headers: {
            "Context-type": "application/json"
        },
        body: JSON.stringify({
            type: QueryType.create,
            query: params,
            data: data
        })
    }).then(res => {
        return res.ok
    }).catch(e => {
        console.error(e)
        return false
    })
}