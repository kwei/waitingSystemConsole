import {BASE_URL} from "@/app/api/source";
import {AccountType} from "@/app/api/auth/[...nextauth]/route";
import {QueryType} from "@/utils/mongoCRUD";

export function queryAccount<T>(params: T): Promise<AccountType[] | null> {
    return fetch(`${BASE_URL}/api/account`, {
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