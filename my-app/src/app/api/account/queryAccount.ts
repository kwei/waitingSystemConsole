import {MONGO_COLLECTION_ACCOUNT, MONGO_DB_NAME} from "@/utils/resource";
import {QueryType} from "@/app/api/account/route";
import {BASE_URL} from "@/app/api/source";

export interface AccountType {
    _id: string;
    name: string;
    password: string;
    admin?: boolean;
}

export function queryAccount<T>(params: T): Promise<AccountType[]> {
    return fetch(`${BASE_URL}/api/account?db=${MONGO_DB_NAME}&collection=${MONGO_COLLECTION_ACCOUNT}`, {
        method: "POST",
        headers: {
            "Context-type": "application/json"
        },
        body: JSON.stringify({
            type: QueryType.read,
            query: params,
            data: undefined
        })
    }).then(res => {
        if (res.ok) return res.json()
        throw res.statusText
    }).then(res => {
        return res.data
    }).catch(e => {
        console.error(e)
        return null
    })
}