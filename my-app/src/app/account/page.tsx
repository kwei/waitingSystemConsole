import {AccountDashboard} from "@/app/account/AccountDashboard";
import {AccountContextProvider} from "@/app/account/context/AccountContextProvider";
import {queryAllAccount} from "@/app/api/account/queryAllAccounts";


const fetchAllAccount = async () => await queryAllAccount()

export default async function Home() {
    const allAccounts = await fetchAllAccount()
    const nonAdminAccounts = allAccounts ? allAccounts.filter(account => !account.admin) : null

    console.log("nonAdminAccounts: ", nonAdminAccounts)

    return (
        <div className='w-full h-full flex flex-col'>
            <AccountContextProvider data={nonAdminAccounts}>
                <AccountDashboard />
            </AccountContextProvider>
        </div>
    )
}
