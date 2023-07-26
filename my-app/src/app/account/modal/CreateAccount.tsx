"use client"

import {Modal} from "@/components/Modal";
import {forwardRef, useContext, useImperativeHandle, useRef, useState} from "react";
import {Loading} from "@/components/Loading";
import {AccountContext} from "@/app/account/context/context";
import {setAccount} from "@/app/api/account/setAccount";
import {queryAllAccount} from "@/app/api/account/queryAllAccounts";
import {useSession} from "next-auth/react";

interface PropsType {
    onClose?: () => void;
    onConfirm?: () => void;
}

export interface CreateAccountModalRefType {
    onOpen: () => void;
    onClose: () => void;
}

export const CreateAccountModal = forwardRef<CreateAccountModalRefType, PropsType>((props, ref) => {
    const { onClose, onConfirm } = props
    const [open, setOpen] = useState<boolean>(false)
    const nameRef = useRef<HTMLInputElement>(null)
    const pwdRef = useRef<HTMLInputElement>(null)
    const pwdCheckRef = useRef<HTMLInputElement>(null)
    const [nameWording, setNameWording] = useState<string | null>(null)
    const [pwdWording, setPwdWording] = useState<string | null>(null)
    const [pwdCheckWording, setPwdCheckWording] = useState<string | null>(null)
    const [isCreating, setIsCreating] = useState<boolean>(false)
    const accountContextData = useContext(AccountContext)
    const { data: session } = useSession()

    useImperativeHandle(ref, () => ({
        onOpen: () => handleOnOpenModal(),
        onClose: () => handleOnCloseModal()
    }))

    function handleOnOpenModal() {
        setOpen(true)
    }

    function handleOnCloseModal() {
        if (onClose) onClose()
        setOpen(false)
    }

    const handleOnCancel = () => {
        handleOnCloseModal()
        setOpen(false)
    }

    const handleOnConfirm = async () => {
        if (nameRef.current && pwdRef.current && pwdCheckRef.current) {
            const name = nameRef.current.value
            const pwd = pwdRef.current.value
            const pwdCheck = pwdCheckRef.current.value

            if (name === '') setNameWording('名字不可空白')
            if (pwd === '') setPwdWording('密碼不可空白')
            if (pwdCheck !== pwd) setPwdCheckWording('密碼不符')

            if (name !== '' && pwd !== '' && pwd === pwdCheck) {
                if (accountContextData) {
                    const [data, setData ] = accountContextData
                    if (data?.filter(account => account.name === name)[0]) setNameWording('此帳號已設定過')
                    else {
                        const currentTime = new Date().getTime() + ''
                        setIsCreating(true)
                        setAccount({ name: name, password: pwd, createDate: currentTime, lastUpdateDate: currentTime, admin: false }).then(res => {
                            if (res) {
                                if (onConfirm) onConfirm()
                            }
                        }).finally(() => {
                            setOpen(false)
                            setIsCreating(false)
                            queryAllAccount().then(res => {
                                if (res) setData(res.filter(account => account.name !== session?.user?.name))
                            })
                        })
                    }
                }
            }
        }
    }

    const rmNameWording = () => {
        setNameWording(null)
    }

    const rmPwdWording = () => {
        setPwdWording(null)
    }

    const rmPwdCheckWording = () => {
        setPwdCheckWording(null)
    }

    if (!open) return null

    return (
        <Modal className='gap-5' onClose={handleOnCloseModal}>
            <span className='w-full text-center text-xl font-bold pb-5'>新增管理帳號</span>
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
            <label className='flex flex-col w-full'>
                <span className='text-gray-500 font-semibold'>密碼確認</span>
                <input
                    type='password'
                    name='password-check'
                    ref={pwdCheckRef}
                    onChange={rmPwdCheckWording}
                    className='p-3 border border-gray-300 rounded-xl focus:outline-0 focus:border-gray-700'
                    placeholder='ex: xxxxxxxxx'
                />
                <span className={`text-sm h-5 text-red-500 ${pwdCheckWording ? 'visible' : 'invisible'}`}>{pwdCheckWording}</span>
            </label>
            <div className='flex w-full items-center gap-4'>
                <button
                    className='px-4 py-2 rounded-2.5 bg-blue-500 border border-blue-500 transition-all duration-200 ease-in-out hover:scale-110'
                    disabled={isCreating}
                    onClick={handleOnConfirm}
                >
                    {isCreating
                        ? <Loading />
                        : '建立帳號'
                    }
                </button>
                <button
                    className='px-4 py-2 text-red-500 rounded-2.5 border border-red-500 transition-all duration-200 ease-in-out hover:scale-110'
                    onClick={handleOnCancel}
                >
                    取消
                </button>
            </div>
        </Modal>
    )
})
CreateAccountModal.displayName = 'CreateAccountModal'