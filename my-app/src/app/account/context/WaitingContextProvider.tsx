"use client"

import {WaitingContext} from "@/app/account/context/context";
import {ReactNode, useState} from "react";
import {WaitingType} from "@/app/api/waiting/route";

interface PropsType {
    children?: ReactNode;
    data: WaitingType[] | null;
}

export function AccountContextProvider(props: PropsType) {
    const [data, setData] = useState<WaitingType[] | null>(props.data)

    return (
        <WaitingContext.Provider value={[ data, setData ]}>
            {props.children}
        </WaitingContext.Provider>
    )
}