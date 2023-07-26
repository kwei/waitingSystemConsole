"use client"

import {useContext} from "react";
import {InfoCard} from "@/app/account/InfoCard";
import {AccountContext} from "@/app/account/context/context";
import {Loading} from "@/components/Loading";
import {ToolBox} from "@/app/account/ToolBox";

export function AccountDashboard() {
    const accountContextData = useContext(AccountContext)

    if (!accountContextData) {
        return (
            <div className='w-full h-full flex'>
                <Loading />
            </div>
        )
    }

    const [accounts, ] = accountContextData

    return (
        <div className='flex flex-col w-full'>
            <ToolBox />
            <div className="grid w-full grid-cols-12 gap-4 p-2 md:p-4">
                {accounts && accounts.map(account => (
                    <InfoCard key={account._id} account={account} />
                ))}
            </div>
        </div>
    )
}