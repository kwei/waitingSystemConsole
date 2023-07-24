import {BASE_URL} from "@/app/api/source";
import {QueryType} from "@/utils/mongoCRUD";

export function updateWaiting<T, D>(params: T, data: D): Promise<boolean> {
    return fetch(`${BASE_URL}/api/info`, {
        method: "POST",
        headers: {
            "Context-type": "application/json"
        },
        body: JSON.stringify({
            type: QueryType.update,
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