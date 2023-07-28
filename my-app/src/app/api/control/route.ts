import {NextRequest} from "next/server";
import {mongoCRUD} from "@/utils/mongoCRUD";
import ControlModel, {IControl} from "@/models/Control";


export async function POST(req: NextRequest, ) {
    return mongoCRUD<IControl>(req, ControlModel)
}