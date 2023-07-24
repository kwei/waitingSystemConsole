import {BASE_URL} from "@/app/api/source";
import {QueryType} from "@/utils/mongoCRUD";
import {WaitingType} from "@/app/api/waiting/route";


export function setWaiting(data: WaitingType): Promise<boolean> {
    return fetch(`${BASE_URL}/api/info`, {
        method: "POST",
        headers: {
            "Context-type": "application/json"
        },
        body: JSON.stringify({
            type: QueryType.create,
            query: undefined,
            data: data
        })
    }).then(res => {
        return res.ok
    }).catch(e => {
        console.error(e)
        return false
    })
}