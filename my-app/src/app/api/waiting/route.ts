import {NextRequest} from "next/server";
import {mongoCRUD} from "@/utils/mongoCRUD";
import WaitingModel, {IWaiting} from "@/models/Waiting";

export interface WaitingType {
    name: string;
    id: string;
    phone: string;
    no: number;
}

export async function POST(req: NextRequest, ) {
    return mongoCRUD<IWaiting>(req, WaitingModel)
}