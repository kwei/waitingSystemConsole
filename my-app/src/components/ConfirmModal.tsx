import {forwardRef, useImperativeHandle, useState} from "react";
import {Modal} from "@/components/Modal";

interface PropsType {
    title: string;
    onClose?: () => void,
    onConfirm: () => void
}

export interface ConfirmModalRefType {
    onOpen: () => void,
    onClose: () => void
}

export const ConfirmModal = forwardRef<ConfirmModalRefType, PropsType>((props, ref) => {
    const { onClose, onConfirm, title } = props
    const [open, setOpen] = useState<boolean>(false)

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
        if (onConfirm) onConfirm()
        setOpen(false)
    }

    if (!open) return null

    return (
        <Modal className='gap-5' onClose={handleOnCloseModal}>
            <span className='w-full text-center text-xl font-bold pb-5'>{title}</span>
            <div className='flex w-full items-center gap-4'>
                <button
                    className='flex-1 px-4 py-2 rounded-2.5 bg-blue-500 border border-blue-500 transition-all duration-200 ease-in-out hover:bg-blue-700 hover:border-blue-700 hover:text-gray-100'
                    onClick={handleOnConfirm}
                >
                    確定
                </button>
                <button
                    className='flex-1 px-4 py-2 text-red-500 rounded-2.5 border border-red-500 transition-all duration-200 ease-in-out hover:bg-red-500 hover:text-gray-100'
                    onClick={handleOnCancel}
                >
                    取消
                </button>
            </div>
        </Modal>
    )
})
ConfirmModal.displayName = 'ConfirmModal'