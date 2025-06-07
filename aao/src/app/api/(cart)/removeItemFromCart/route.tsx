"use server"

import {createConnection} from "@/../lib/db" 
import { NextResponse } from "next/server"


export async function POST(req: Request) {
    try {
        const res = await req.json()
        const UserID = res.UserID
        const FornitureID = res.FornitureID
        
        if (UserID == undefined || FornitureID == undefined) return NextResponse.json({ message: "Error", error: "Invalid user id or FornitureID" }, {status: 500});


        // The item is already present and must be increment the number

        const db = await createConnection();
        let sql = 'DELETE FROM cart WHERE User_idUser=' + UserID + ' and Furniture_furnitureID=' + FornitureID + '; ';
        console.log(sql);
        
        const [cartIDList] = await db.query(sql);
        console.log("cartIDList");
        console.log(cartIDList);
        
        return NextResponse.json({cartIDList: cartIDList}, {status: 200})

    } catch (error: any) { return NextResponse.json({ message: "Error", error: error }, {status: 500}); }

}