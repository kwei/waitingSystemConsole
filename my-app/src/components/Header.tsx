"use client"

import {signOut, useSession} from "next-auth/react";
import {useEffect} from "react";
import {usePathname, useRouter} from "next/navigation";
import {ADMIN} from "@/utils/resource";
import {NavLink} from "@/components/NavLink";

export const Header = () => {
    const router = useRouter()
    const { data: session, status } = useSession()
    const pathname = usePathname()

    useEffect(() => {
        if (!session && status !== 'loading') router.push('/login')
    }, [session, status, router])

    const handleSignOut = () => {
        signOut({ redirect: true, callbackUrl: '/login' }).finally()
    }

    return (
        <div className='flex w-full items-center border-b border-gray-df p-2 md:px-4 justify-between'>
            <div className='flex items-center gap-2'>
                <NavLink path='/' label='候位列表' selected={pathname === '/'} />
                <NavLink path='/account' label='帳號管理' show={session?.user?.name === ADMIN} selected={pathname === '/account'} />
            </div>
            {session
                ? <span className='px-3 py-1 text-red-500 hover:cursor-pointer' onClick={handleSignOut}>登出 {session.user?.name}</span>
                : <NavLink path='/login' label='登入' selected={false} />
            }
        </div>
    )
}