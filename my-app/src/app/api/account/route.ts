import {NextRequest} from "next/server";
import {mongoCRUD} from "@/utils/mongoCRUD";
import AccountModel, {IAccount} from "@/models/Account";


export async function POST(req: NextRequest, ) {
    return mongoCRUD<IAccount>(req, AccountModel)
}