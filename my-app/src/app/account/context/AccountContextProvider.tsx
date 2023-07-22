"use client"

import {AccountType} from "@/app/api/account/queryAccount";
import {AccountContext} from "@/app/account/context/context";
import {ReactNode, useState} from "react";

interface PropsType {
    children?: ReactNode;
}

export function AccountContextProvider(props: PropsType) {
    const [data, setData] = useState<AccountType[] | null>(null)

    return (
        <AccountContext.Provider value={[ data, setData ]}>
            {props.children}
        </AccountContext.Provider>
    )
}