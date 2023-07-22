import {Card} from "@/app/components/Card";
import {AccountType} from "@/app/api/account/queryAccount";

interface PropsType {
    account: AccountType;
}

export function InfoCard(props: PropsType) {
    const { account } = props
    return (
        <Card className='h-auto col-span-12 md:col-span-3'>
            <span className='text-xl font-semibold'>{account.name}</span>
        </Card>
    )
}