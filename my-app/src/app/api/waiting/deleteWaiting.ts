import {BASE_URL} from "@/app/api/source";
import {QueryType} from "@/utils/mongoCRUD";


export function deleteWaiting<T>(params: T): Promise<boolean> {
    return fetch(`${BASE_URL}/api/info`, {
        method: "POST",
        headers: {
            "Context-type": "application/json"
        },
        body: JSON.stringify({
            type: QueryType.delete,
            query: params,
            data: undefined
        })
    }).then(res => {
        return res.ok
    }).catch(e => {
        console.error(e)
        return false
    })
}