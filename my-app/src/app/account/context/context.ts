"use client"

import {createContext, Dispatch, SetStateAction} from "react";
import {AccountType} from "@/app/api/auth/[...nextauth]/route";
import {WaitingType} from "@/app/api/waiting/route";

export const AccountContext = createContext<[AccountType[] | null, Dispatch<SetStateAction<AccountType[] | null>>] | null>(null)

export const WaitingContext = createContext<[WaitingType[] | null, Dispatch<SetStateAction<WaitingType[] | null>>] | null>(null)

