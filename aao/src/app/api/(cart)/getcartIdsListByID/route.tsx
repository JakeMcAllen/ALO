"use server"

import {createConnection} from "@/../lib/db" 
import { NextResponse } from "next/server"


export async function POST(req: Request) {
    try {
        const res = await req.json()
        const UserID = res.UserID
        
        if (UserID == undefined) return NextResponse.json({ message: "Error", error: "Invalid user id" }, {status: 500});


        const db = await createConnection();
        let sql = 'select Furniture_furnitureID, Quantity  from cart where User_idUser= ' + UserID + ' ; ';
        console.log(sql);
        
        const [cartIDList] = await db.query(sql);
        console.log(cartIDList);
        

        return NextResponse.json({cartIDList: cartIDList}, {status: 200})

    } catch (error: any) { return NextResponse.json({ message: "Error", error: error }, {status: 500}); }

}