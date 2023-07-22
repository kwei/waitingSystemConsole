import {AccountDashboard} from "@/app/account/AccountDashboard";
import {AccountContextProvider} from "@/app/account/context/AccountContextProvider";
import QueryAccount from "@/app/account/queryAccount/QueryAccount";

export default async function Home() {

    return (
        <div className='w-full h-full flex flex-col'>
            <AccountContextProvider>
                <AccountDashboard />
                <QueryAccount />
            </AccountContextProvider>
        </div>
    )
}
