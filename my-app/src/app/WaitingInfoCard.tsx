"use client"

import {WaitingType} from "@/app/api/waiting/route";
import {Card} from "@/app/components/Card";
import {formatDateString} from "@/utils/formatDateString";
import {waitingStatus, waitingStatusStr} from "@/models/Waiting";

interface PropsType {
    waitingInfo: WaitingType;
    index: number;
}

export function WaitingInfoCard(props: PropsType) {
    const { waitingInfo, index } = props

    return (
        <Card className={`h-auto col-span-12 md:col-span-4 ${waitingInfo.status === waitingStatus.waiting ? 'border-green-500' : (waitingInfo.status === waitingStatus.completed ? 'text-gray-300' : 'border-red-500 text-gray-300')}`}>
            <div className='flex items-center justify-between'>
                <span className='text-sm text-gray-300 italic'>學號：{waitingInfo.studentId}</span>
                <span className={`text-sm py-1 px-2 rounded-2.5 ${waitingInfo.status === waitingStatus.waiting ? 'bg-green-500 text-gray-100' : (waitingInfo.status === waitingStatus.completed ? 'text-gray-100 bg-gray-500' : 'bg-red-500 text-gray-100')}`}>{waitingStatusStr[waitingInfo.status]}</span>
            </div>
            <span className='text-xl font-semibold mb-2'>{waitingInfo.name} (第 {index + 1} 順位)</span>
            <div className='flex flex-col border-t border-gray-300 pt-2 text-sm'>
                <div className='flex items-center gap-2'>電話：{waitingInfo.phone}</div>
                <div className='flex items-center gap-2'>預約送出時間：{formatDateString(waitingInfo.requiredTime)}</div>
                <div className='flex items-center gap-2'>預約結束時間：{waitingInfo.finishedTime ? formatDateString(waitingInfo.finishedTime) : '尚未完成'}</div>
            </div>
            <div className='flex w-full items-center pt-2 gap-1'>
                <button className={`flex-1 rounded-1.25 py-2 transition-all duration-200 ease-in-out ${waitingInfo.status === waitingStatus.waiting ? 'hover:bg-red-300' : ''}`} disabled={waitingInfo.status !== waitingStatus.waiting}>取消預約</button>
                <button className={`flex-1 rounded-1.25 py-2 transition-all duration-200 ease-in-out ${waitingInfo.status === waitingStatus.waiting ? 'hover:bg-blue-300' : ''}`} disabled={waitingInfo.status !== waitingStatus.waiting}>完成預約</button>
            </div>
        </Card>
    )
}