"use client"

import {WaitingType} from "@/app/api/waiting/route";
import {useContext, useEffect} from "react";
import {WaitingContext} from "@/app/account/context/context";

interface PropsType {
    data: WaitingType[] | null;
}

export function SaveWaitingData(props: PropsType) {
    const { data } = props
    const contextData = useContext(WaitingContext)

    useEffect(() => {
        if (contextData && data) {
            const [, setDate ] = contextData
            setDate(data)
        }
    }, [contextData, data])

    return <></>
}