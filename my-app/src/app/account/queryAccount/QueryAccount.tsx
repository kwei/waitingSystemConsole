import {queryAccount} from "@/app/api/account/queryAccount";
import {SaveAccountData} from "./SaveAccountData";

export default async function QueryAccount() {
    const allAccounts = await queryAccount({})
    const nonAdminAccounts = allAccounts.filter(account => !account.admin)

    return <SaveAccountData data={nonAdminAccounts} />
}