"use client"

import {MajorWaitingInfo, WaitingType} from "@/app/api/waiting/route";
import {Card} from "@/components/Card";
import {formatDateString} from "@/utils/formatDateString";
import {waitingStatus, waitingStatusStr} from "@/models/Waiting";
import {useCallback, useContext, useMemo, useRef, useState} from "react";
import {updateWaiting} from "@/app/api/waiting/updateWaiting";
import {Loading} from "@/components/Loading";
import {WaitingContext} from "@/app/account/context/context";
import {queryAllWaiting} from "@/app/api/waiting/queryAllWaiting";
import {ConfirmModal, ConfirmModalRefType} from "@/components/ConfirmModal";

interface PropsType {
    waitingInfo: WaitingType;
    index: number;
}

export function WaitingInfoCard(props: PropsType) {
    const { waitingInfo, index } = props
    const contextData = useContext(WaitingContext)
    const [isCanceling, setIsCanceling] = useState<boolean>(false)
    const [isConfirming, setIsConfirming] = useState<boolean>(false)
    const [isCompleting, setIsCompleting] = useState<boolean>(false)
    const cancelModalRef = useRef<ConfirmModalRefType>(null)
    const confirmModalRef = useRef<ConfirmModalRefType>(null)
    const completeModalRef = useRef<ConfirmModalRefType>(null)

    const majorInfo = useMemo((): MajorWaitingInfo => ({
        name: waitingInfo.name,
        studentId: waitingInfo.studentId,
        phone: waitingInfo.phone
    }), [])

    const handleOpenCancelModal = () => {
        if (cancelModalRef.current) cancelModalRef.current.onOpen()
    }

    const handleOpenConfirmModal = () => {
        if (confirmModalRef.current) confirmModalRef.current.onOpen()
    }

    const handleOpenCompleteModal = () => {
        if (completeModalRef.current) completeModalRef.current.onOpen()
    }

    const reFetch = useCallback(() => {
        queryAllWaiting().then(res => {
            if (contextData && res) {
                const [, setData] = contextData
                setData(res)
            }
        })
    }, [])

    const handleCancelWaiting = useCallback(() => {
        const data: WaitingType = {
            ...waitingInfo,
            status: waitingStatus.canceled
        }
        setIsCanceling(true)
        updateWaiting(majorInfo, data).then(() => {
            setIsCanceling(false)
            reFetch()
        })
    }, [majorInfo])

    const handleAcceptWaiting = useCallback(() => {
        const data: WaitingType = {
            ...waitingInfo,
            status: waitingStatus.going
        }
        setIsConfirming(true)
        updateWaiting(majorInfo, data).then(() => {
            setIsConfirming(false)
            reFetch()
        })
    }, [majorInfo])

    const handleCompleteWaiting = useCallback(() => {
        const data: WaitingType = {
            ...waitingInfo,
            status: waitingStatus.completed
        }
        setIsCompleting(true)
        updateWaiting(majorInfo, data).then(() => {
            setIsCompleting(false)
            reFetch()
        })
    }, [majorInfo])


    return (
        <Card className={`h-auto col-span-12 md:col-span-4 ${waitingInfo.status === waitingStatus.waiting ? 'border-green-500' : (waitingInfo.status === waitingStatus.completed ? 'text-gray-300' : (waitingInfo.status === waitingStatus.going ? 'border-orange-300' : 'border-red-500 text-gray-300'))}`}>
            <div className='flex items-center justify-between'>
                <span className='text-sm text-gray-300 italic'>學號：{waitingInfo.studentId}</span>
                <span className={`text-sm py-1 px-2 rounded-1.25 ${waitingInfo.status === waitingStatus.waiting ? 'bg-green-500 text-gray-100' : (waitingInfo.status === waitingStatus.completed ? 'text-gray-100 bg-gray-500' : (waitingInfo.status === waitingStatus.going ? 'text-gray-100 bg-orange-500' : 'bg-red-500 text-gray-100'))}`}>{waitingStatusStr[waitingInfo.status]}</span>
            </div>
            <span className='text-xl font-semibold my-2'>{waitingInfo.name} (編號 {index + 1})</span>
            <div className='flex flex-col border-t border-gray-300 pt-2 text-sm'>
                <div className='flex items-center gap-2'>電話：{waitingInfo.phone}</div>
                <div className='flex items-center gap-2'>預約送出時間：{formatDateString(waitingInfo.requiredTime)}</div>
                <div className='flex items-center gap-2'>預約結束時間：{waitingInfo.finishedTime ? formatDateString(waitingInfo.finishedTime) : '尚未完成'}</div>
            </div>
            <div className='flex w-full items-center pt-2 gap-1'>
                {waitingInfo.status === waitingStatus.waiting &&
                    <>
                        <button
                            className={`flex-1 rounded-1.75 py-2 transition-all duration-200 ease-in-out hover:bg-gray-300`}
                            disabled={isConfirming}
                            onClick={handleOpenConfirmModal}
                        >
                            {isConfirming ? <Loading /> : '接受預約'}
                        </button>
                        <button
                            className={`flex-1 rounded-1.75 py-2 transition-all duration-200 ease-in-out hover:bg-gray-300`}
                            disabled={isCanceling}
                            onClick={handleOpenCancelModal}
                        >
                            {isCanceling ? <Loading /> : '取消預約'}
                        </button>
                    </>
                }
                {waitingInfo.status === waitingStatus.going &&
                    <button
                        className={`flex-1 rounded-1.75 py-2 transition-all duration-200 ease-in-out hover:bg-gray-300`}
                        disabled={isCompleting}
                        onClick={handleOpenCompleteModal}
                    >
                        {isCompleting ? <Loading /> : '完成預約'}
                    </button>
                }
            </div>
            <ConfirmModal ref={cancelModalRef} onConfirm={handleCancelWaiting} title={`確定要取消 ${waitingInfo.name} 的預約嗎?`} />
            <ConfirmModal ref={confirmModalRef} onConfirm={handleAcceptWaiting} title={`確定要接受 ${waitingInfo.name} 的預約嗎?`} />
            <ConfirmModal ref={completeModalRef} onConfirm={handleCompleteWaiting} title={`確定要完成 ${waitingInfo.name} 的預約嗎?`} />
        </Card>
    )
}