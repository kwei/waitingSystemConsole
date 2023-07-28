import {WaitingDashboard} from "@/app/(site)/WaitingDashboard";
import {AccountContextProvider} from "@/app/account/context/WaitingContextProvider";
import {QueryWaitingAPI} from "@/app/(site)/queryWaitingAPI/QueryWaitingAPI";

export default async function Home() {
    return (
        <div className="w-full h-full flex flex-col">
            <AccountContextProvider data={null}>
                <WaitingDashboard />

                <QueryWaitingAPI />
            </AccountContextProvider>
        </div>
    )
}
