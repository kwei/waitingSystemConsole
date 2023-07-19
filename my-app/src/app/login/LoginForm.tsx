"use client"

import {signIn, signOut, useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {useEffect} from "react";


export const LoginForm = () => {
    const router = useRouter()
    const { data: session, status } = useSession()

    useEffect(() => {
        console.log(session, status)
        if (session && status === 'authenticated') router.push('/')
    }, [session, status, router])

    const handleSignIn = () => {
        signIn().finally()
    }

    const handleSignOut = () => {
        signOut().finally()
    }

    return (
        <div className='flex items-center gap-4'>
            <button onClick={handleSignIn}>登入</button>
            <button onClick={handleSignOut}>登出</button>
        </div>
    )
}