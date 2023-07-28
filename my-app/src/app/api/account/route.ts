import {NextRequest} from "next/server";
import {mongoCRUD} from "@/utils/mongoCRUD";
import AccountModel, {IAccount} from "@/models/Account";

export interface ControlType {
    _id?: string;
    handler: string;
    acceptWaiting: boolean;
    acceptNumber: number;
    handlingName: string[];
    handlingId: number[];
    handlingPhone: string[];
    handlingOrder: number[];
    currentWaiting: number[];
}

export async function POST(req: NextRequest, ) {
    return mongoCRUD<IAccount>(req, AccountModel)
}