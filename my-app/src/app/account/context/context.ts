"use client"

import {createContext, Dispatch, SetStateAction} from "react";
import {AccountType} from "@/app/api/auth/[...nextauth]/route";

export const AccountContext = createContext<[AccountType[] | null, Dispatch<SetStateAction<AccountType[] | null>>] | null>(null)

