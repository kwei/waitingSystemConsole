"use client"

import {createContext, Dispatch, SetStateAction} from "react";
import {AccountType} from "@/app/api/account/queryAccount";

export const AccountContext = createContext<[AccountType[] | null, Dispatch<SetStateAction<AccountType[] | null>>] | null>(null)