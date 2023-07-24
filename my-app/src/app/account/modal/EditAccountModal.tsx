"use client"

import {Modal} from "@/app/components/Modal";
import {forwardRef, useContext, useImperativeHandle, useRef, useState} from "react";
import {Loading} from "@/app/components/Loading";
import {AccountType} from "@/app/api/auth/[...nextauth]/route";
import {queryAllAccount} from "@/app/api/account/queryAllAccounts";
import {AccountContext} from "@/app/account/context/context";
import {useSession} from "next-auth/react";
import {IoTrashOutline} from "react-icons/io5";
import {updateAccount} from "@/app/api/account/updateAccount";
import {deleteAccount} from "@/app/api/account/deleteAccount";

interface PropsType {
    account: AccountType;
    onClose?: () => void;
    onConfirm?: () => void;
}

export interface EditAccountModalRefType {
    onOpen: () => void;
    onClose: () => void;
}

export const EditAccountModal = forwardRef<EditAccountModalRefType, PropsType>((props, ref) => {
    const { account, onClose, onConfirm } = props
    const [open, setOpen] = useState<boolean>(false)
    const nameRef = useRef<HTMLInputElement>(null)
    const permissionRef = useRef<HTMLInputElement>(null)
    const [nameWording, setNameWording] = useState<string | null>(null)
    const [isSaving, setIsSaving] = useState<boolean>(false)
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
        if (nameRef.current && permissionRef.current) {
            const name = nameRef.current.value
            const permission = permissionRef.current.checked

            if (name === '') setNameWording('名字不可空白')

            if (name !== '') {
                const newData = {
                    name: name,
                    password: account.password,
                    admin: permission,
                    createDate: account.createDate,
                    lastUpdateDate: new Date().getTime().toString()
                }
                setIsSaving(true)
                updateAccount(account, newData).then(res => {
                    if (res) {
                        if (onConfirm) onConfirm()
                    }
                }).finally(() => {
                    setOpen(false)
                    setIsSaving(false)
                    if (accountContextData) {
                        const [, setData ] = accountContextData
                        queryAllAccount().then(res => {
                            if (res) setData(res.filter(account => account.name !== session?.user?.name))
                        })
                    }
                })
            }
        }
    }

    const handleOnDeleteAccount = () => {
        deleteAccount(account).finally(() => {
            setOpen(false)
            if (accountContextData) {
                const [, setData ] = accountContextData
                queryAllAccount().then(res => {
                    if (res) setData(res.filter(account => account.name !== session?.user?.name))
                })
            }
        })
    }

    const rmNameWording = () => {
        setNameWording(null)
    }

    if (!open) return null

    return (
        <Modal className='gap-5' onClose={handleOnCloseModal}>
            <span className='w-full text-center text-xl font-bold pb-5'>編輯管理帳號</span>
            <label className='flex flex-col w-full'>
                <span className='text-gray-500 font-semibold'>名字</span>
                <input
                    type='text'
                    name='name'
                    ref={nameRef}
                    onChange={rmNameWording}
                    defaultValue={account.name}
                    className='p-3 border border-gray-300 rounded-xl focus:outline-0 focus:border-gray-700'
                    placeholder='ex: 王小美'
                />
                <span className={`text-sm h-5 text-red-500 ${nameWording ? 'visible' : 'invisible'}`}>{nameWording}</span>
            </label>
            <label className='flex items-center w-full gap-2'>
                <span className='text-gray-500 font-semibold'>權限</span>
                <input
                    type='checkbox'
                    name='permission'
                    ref={permissionRef}
                    defaultChecked={account.admin}
                    className='w-4 h-4 border border-gray-300 rounded-xl focus:outline-0 focus:border-gray-700'
                />
            </label>
            <div className='flex w-full items-center justify-between'>
                <IoTrashOutline
                    className='w-4 h-4 text-red-500 hover:cursor-pointer hover:text-red-700'
                    onClick={handleOnDeleteAccount}
                />
                <div className='flex items-center gap-4'>
                    <button
                        className='px-4 py-2 text-red-500 rounded-2.5 border border-red-500 transition-all duration-200 ease-in-out hover:scale-110'
                        onClick={handleOnCancel}
                    >
                        取消
                    </button>
                    <button
                        className='px-4 py-2 rounded-2.5 bg-blue-500 border border-blue-500 transition-all duration-200 ease-in-out hover:scale-110'
                        disabled={isSaving}
                        onClick={handleOnConfirm}
                    >
                        {isSaving
                            ? <Loading />
                            : '儲存變更'
                        }
                    </button>
                </div>
            </div>
        </Modal>
    )
})
EditAccountModal.displayName = 'EditAccountModal'