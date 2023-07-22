"use client"

import {AccountType} from "@/app/api/account/queryAccount";
import {useContext} from "react";
import {AccountContext} from "@/app/account/context/context";

interface PropsType {
    data: AccountType[] | null;
}

export function SaveAccountData(props: PropsType) {
    const accountContextData = useContext(AccountContext)

    if (accountContextData) {
        const [, setAccounts] = accountContextData
        setAccounts(props.data)
    }

    return null
}