import {BASE_URL} from "@/app/api/source";
import {QueryType} from "@/utils/mongoCRUD";
import {WaitingType} from "@/app/api/waiting/route";

export function queryWaiting<T>(params: T): Promise<WaitingType[]> {
    return fetch(`${BASE_URL}/api/info`, {
        method: "POST",
        headers: {
            "Context-type": "application/json"
        },
        body: JSON.stringify({
            type: QueryType.read,
            query: params,
            data: undefined
        }),
        cache: "no-cache"
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