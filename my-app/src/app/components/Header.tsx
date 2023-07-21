"use client"

import Link from "next/link";
import {signOut, useSession} from "next-auth/react";
import {useEffect} from "react";
import {useRouter} from "next/navigation";

export const Header = () => {
    const router = useRouter()
    const { data: session, status } = useSession()

    useEffect(() => {
        if (!session || status !== 'authenticated') router.push('/login')
    }, [session, status, router])

    const handleSignOut = () => {
        signOut({ redirect: true, callbackUrl: '/login' }).finally()
    }

    return (
        <div className='flex w-full items-center border-b border-gray-df p-2 md:px-4 justify-between'>
            <div className='flex items-center'>
                <Link className='text-sm md:text-lg px-4 py-2 select-none font-semibold' href='/'>主控台</Link>
                <Link className='text-sm md:text-lg px-4 py-2 select-none font-semibold' href='/account'>帳號管理</Link>
            </div>
            {session &&
                <span className='px-3 py-1 text-red-500 hover:cursor-pointer' onClick={handleSignOut}>登出</span>
            }
        </div>
    )
}