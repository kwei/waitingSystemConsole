"use client"

import {AccountContext} from "@/app/account/context/context";
import {ReactNode, useState} from "react";
import {AccountType} from "@/app/api/auth/[...nextauth]/route";

interface PropsType {
    children?: ReactNode;
    data: AccountType[] | null;
}

export function AccountContextProvider(props: PropsType) {
    const [data, setData] = useState<AccountType[] | null>(props.data)

    return (
        <AccountContext.Provider value={[ data, setData ]}>
            {props.children}
        </AccountContext.Provider>
    )
}