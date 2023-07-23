import {BASE_URL} from "@/app/api/source";
import {QueryType} from "@/app/api/account/route";
import {AccountType} from "@/app/api/auth/[...nextauth]/route";


export function setAccount(data: AccountType): Promise<boolean> {
    return fetch(`${BASE_URL}/api/account`, {
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