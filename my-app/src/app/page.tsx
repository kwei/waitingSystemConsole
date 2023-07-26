import {queryAllWaiting} from "@/app/api/waiting/queryAllWaiting";
import {WaitingDashboard} from "@/app/WaitingDashboard";
import {AccountContextProvider} from "@/app/account/context/WaitingContextProvider";

const fetchAllWaiting = async () => await queryAllWaiting()

export default async function Home() {
    const allWaiting = await fetchAllWaiting()
    return (
        <div className="w-full h-full flex flex-col">
            <AccountContextProvider data={allWaiting}>
                <WaitingDashboard />
            </AccountContextProvider>
        </div>
    )
}
