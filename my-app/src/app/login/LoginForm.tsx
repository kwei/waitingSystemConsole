"use client"

import {signIn, useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {useEffect, useRef, useState} from "react";
import {Card} from "@/app/components/Card";
import {Loading} from "@/app/components/Loading";
import {ADMIN} from "@/utils/resource";


export const LoginForm = () => {
    const router = useRouter()
    const { data: session, status } = useSession()
    const nameRef = useRef<HTMLInputElement>(null)
    const pwdRef = useRef<HTMLInputElement>(null)
    const [isLogin, setIsLogin] = useState<boolean>(false)
    const [nameWording, setNameWording] = useState<string | null>(null)
    const [pwdWording, setPwdWording] = useState<string | null>(null)

    useEffect(() => {
        if (session && status === 'authenticated') {
            if (session.user?.name === ADMIN) router.push('/account')
            else router.push('/')
        }
    }, [session, status, router])

    const handleSignIn = () => {
        if (nameRef.current && pwdRef.current) {
            const name = nameRef.current.value
            const pwd = pwdRef.current.value

            if (name === '') setNameWording('名字不可為空')
            if (pwd === '') setPwdWording('密碼不可為空')

            if (name !== '' && pwd !== '') {
                setIsLogin(true)
                signIn('credentials', {
                    username: name,
                    password: pwd,
                    redirect: true,
                    callbackUrl: name === ADMIN ? '/account' : '/'
                }).then(res => {
                    console.log(res)
                }).catch(e => {
                    console.log(e)
                }).finally(() => {
                    setIsLogin(false)
                })
            }
        }
    }

    const rmNameWording = () => setNameWording(null)
    const rmPwdWording = () => setPwdWording(null)

    return (
        <div className='grid w-full grid-cols-12'>
            <div className='col-span-1 md:col-span-3'></div>
            <Card className='col-span-10 md:col-span-6 gap-8'>
                <div className='flex w-full items-center justify-between pb-4'>
                    <h2 className=' flex-1 text-center text-xl font-bold'>登入您的帳號</h2>
                </div>
                <label className='flex flex-col w-full'>
                    <span className='text-gray-500 font-semibold'>名字</span>
                    <input
                        type='text'
                        name='name'
                        ref={nameRef}
                        onChange={rmNameWording}
                        className='p-3 border border-gray-300 rounded-xl focus:outline-0 focus:border-gray-700'
                        placeholder='ex: 王小美'
                    />
                    <span className={`text-sm h-5 text-red-500 ${nameWording ? 'visible' : 'invisible'}`}>{nameWording}</span>
                </label>
                <label className='flex flex-col w-full'>
                    <span className='text-gray-500 font-semibold'>密碼</span>
                    <input
                        type='password'
                        name='password'
                        ref={pwdRef}
                        onChange={rmPwdWording}
                        className='p-3 border border-gray-300 rounded-xl focus:outline-0 focus:border-gray-700'
                        placeholder='ex: xxxxxxxxx'
                    />
                    <span className={`text-sm h-5 text-red-500 ${pwdWording ? 'visible' : 'invisible'}`}>{pwdWording}</span>
                </label>
                <div className='flex w-full items-center gap-4'>
                    <button className='w-full px-4 py-2 rounded-2.5 bg-blue-500' disabled={isLogin} onClick={handleSignIn}>
                        {isLogin
                            ? <Loading />
                            : '登入'
                        }
                    </button>
                </div>
            </Card>
            <div className='col-span-1 md:col-span-3'></div>
        </div>
    )
}