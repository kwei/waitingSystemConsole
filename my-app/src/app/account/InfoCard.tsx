import {Card} from "@/app/components/Card";
import {AccountType} from "@/app/api/auth/[...nextauth]/route";
import {formatDateString} from "@/utils/formatDateString";
import {IoPencilOutline} from "react-icons/io5";
import {EditAccountModal, EditAccountModalRefType} from "@/app/account/modal/EditAccountModal";
import {useRef} from "react";

interface PropsType {
    account: AccountType;
}

export function InfoCard(props: PropsType) {
    const { account } = props
    const { name, admin, lastUpdateDate, createDate } = account
    const editAccountModalRef = useRef<EditAccountModalRefType>(null)

    const handleOpenEditAccountModal = () => {
        if (editAccountModalRef.current) {
            editAccountModalRef.current.onOpen()
        }
    }

    return (
        <Card className='h-auto col-span-12 md:col-span-4'>
            <div className='flex items-center justify-between'>
                <span className='text-sm text-gray-300 italic'>更新於：{formatDateString(lastUpdateDate)}</span>
                <div
                    className='flex items-center justify-center w-8 h-8 p-2 rounded-2.5 transition-all duration-200 ease-in-out hover:cursor-pointer hover:bg-gray-300'
                    onClick={handleOpenEditAccountModal}
                >
                    <IoPencilOutline className='w-4 h-4' />
                </div>
            </div>
            <span className='text-xl font-semibold mb-2'>{name}</span>
            <div className='flex flex-col border-t border-gray-300 pt-2'>
                <span className='text-sm'>創建於：{formatDateString(createDate)}</span>
                <span className='text-sm'>權限：{admin ? '開' : '關'}</span>
            </div>
            <EditAccountModal ref={editAccountModalRef} account={account} />
        </Card>
    )
}