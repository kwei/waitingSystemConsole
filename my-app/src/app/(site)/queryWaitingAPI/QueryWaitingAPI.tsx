import {queryAllWaiting} from "@/app/api/waiting/queryAllWaiting";
import {SaveWaitingData} from "@/app/(site)/queryWaitingAPI/SaveWaitingData";

const fetchAllWaiting = async () => await queryAllWaiting()

export async function QueryWaitingAPI() {
    const allWaiting = await fetchAllWaiting()

    return <SaveWaitingData data={allWaiting} />
}