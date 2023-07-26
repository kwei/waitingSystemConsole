"use client"

import {WaitingType} from "@/app/api/waiting/route";
import {WaitingInfoCard} from "@/app/WaitingInfoCard";
import {useContext, useEffect, useState} from "react";
import {WaitingContext} from "@/app/account/context/context";

export function WaitingDashboard() {
    const contextData = useContext(WaitingContext)
    const [orderedWaitingList, setOrderedWaitingList] = useState<WaitingType[] | null>(null)

    useEffect(() => {
        if (contextData) {
            const [data, ] = contextData
            if (data) {
                setOrderedWaitingList(data.sort((a, b) => (
                    a.requiredTime - b.requiredTime
                )))
            }
        }
    }, [contextData])

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