"use client"

import {CreateAccountModal, CreateAccountModalRefType} from "@/app/account/modal/CreateAccount";
import {useRef} from "react";

export function ToolBox() {
    const createAccountModalRef = useRef<CreateAccountModalRefType>(null)

    const handleOpenCreateAccountModal = () => {
        if (createAccountModalRef.current) {
            createAccountModalRef.current.onOpen()
        }
    }

    return (
        <div className='flex flex-row-reverse items-center w-full gap-5 p-4'>
            <button
                className='px-4 py-2 rounded-2.5 bg-blue-500 text-gray-100 hover:bg-blue-300 hover:text-gray-900'
                onClick={handleOpenCreateAccountModal}
            >
                新增管理帳號
            </button>
            <CreateAccountModal ref={createAccountModalRef} />
        </div>
    )
}