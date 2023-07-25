"use client"

import {WaitingType} from "@/app/api/waiting/route";
import {Card} from "@/app/components/Card";
import {formatDateString} from "@/utils/formatDateString";

interface PropsType {
    waitingInfo: WaitingType;
}

export function WaitingInfoCard(props: PropsType) {
    const { waitingInfo } = props

    return (
        <Card className='h-auto col-span-12 md:col-span-4'>
            <div className='flex items-center justify-between'>
                <span className='text-sm text-gray-300 italic'>學號：{waitingInfo.studentId}</span>
            </div>
            <span className='text-xl font-semibold mb-2'>{waitingInfo.name}</span>
            <div className='flex flex-col border-t border-gray-300 pt-2 text-sm'>
                <span className='text-green-500'>預約送出時間：{formatDateString(waitingInfo.requiredTime)}</span>
                <span className='text-red-500'>預約結束時間：{waitingInfo.finishedTime ? formatDateString(waitingInfo.finishedTime) : '尚未完成'}</span>
                <span className=''>電話：{waitingInfo.phone}</span>
                <span className=''>第 {waitingInfo.order} 順位</span>
                <span className={`${waitingInfo.status ? '' : ''}`}>預約狀態：{waitingInfo.status}</span>
            </div>
        </Card>
    )
}