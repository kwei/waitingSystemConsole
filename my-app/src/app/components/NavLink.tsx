import Link from "next/link";

interface PropsType {
    path: string;
    label: string;
    show?: boolean;
    selected: boolean;
}

export function NavLink(props: PropsType) {
    const { path, label, show, selected } = props

    if (show === false) return null

    return <Link href={path} className={`text-sm md:text-lg px-4 py-2 select-none font-semibold rounded-2.5 hover:bg-gray-200 transition-all duration-200 ease-in-out ${selected ? 'bg-gray-300' : ''}`}>{label}</Link>
}