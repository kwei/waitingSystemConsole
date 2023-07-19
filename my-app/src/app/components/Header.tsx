import Link from "next/link";

export const Header = () => {

    return (
        <div className='flex w-full items-center border-b border-gray-df p-2 md:px-4'>
            <Link className='text-sm md:text-lg px-4 py-2 select-none font-semibold' href='/'>主控台</Link>
            <Link className='text-sm md:text-lg px-4 py-2 select-none font-semibold' href='/account'>帳號管理</Link>
        </div>
    )
}