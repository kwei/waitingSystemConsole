"use client"

import {WaitingType} from "@/app/api/waiting/route";
import {WaitingInfoCard} from "@/app/WaitingInfoCard";
import {useEffect, useState} from "react";

interface PropsType {
    waitingList: WaitingType[] | null;
}

export function WaitingDashboard(props: PropsType) {
    const { waitingList } = props
    const [orderedWaitingList, setOrderedWaitingList] = useState<WaitingType[] | null>(null)

    useEffect(() => {
        if (waitingList) {
            setOrderedWaitingList(waitingList.sort((a, b) => a.requiredTime - b.requiredTime))
        }
    }, [waitingList])

    return (
        <div className='flex flex-col w-full'>
            <div className="grid w-full grid-cols-12 gap-4 p-2 md:p-4">
                {orderedWaitingList && orderedWaitingList.map((waiting, index) => (
                    <WaitingInfoCard key={waiting._id} waitingInfo={waiting} index={index} />
                ))}
            </div>
        </div>
    )
}