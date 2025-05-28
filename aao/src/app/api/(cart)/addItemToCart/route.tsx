"use server"

import {createConnection} from "@/../lib/db" 
import { NextResponse } from "next/server"


export async function POST(req: Request) {
    try {
        const res = await req.json()
        const UserID = res.UserID
        const FornitureID = res.FornitureID
        
        if (UserID == undefined || FornitureID == undefined) return NextResponse.json({ message: "Error", error: "Invalid user id or FornitureID" }, {status: 500});



        const db = await createConnection();
        let sql = 'select count(*) as isPresent from cart where User_idUser=' + UserID + ' and Furniture_furnitureID=' + FornitureID + '; ';
        console.log(sql);
        const [cartIDList] = await db.query(sql);
        console.log(cartIDList[0].isPresent);
        
        
        if (cartIDList[0].isPresent) {
            // The item is already present and must be increment the number

            const db1 = await createConnection();
            let sql1 = 'UPDATE cart SET Quantity = Quantity + 1 WHERE User_idUser=' + UserID + ' and Furniture_furnitureID=' + FornitureID + '; ';
            console.log(sql1);
            
            const [cartIDList] = await db1.query(sql1);
            console.log("cartIDList");
            console.log(cartIDList);
            
            return NextResponse.json({cartIDList: cartIDList}, {status: 200})

        } else { 
            // The item is not present and can be insert

            const db1 = await createConnection();
            let sql1 = 'INSERT INTO cart (User_idUser, Furniture_furnitureID) VALUES (' + UserID + ', ' + FornitureID + '); ';
            console.log(sql1);
            
            const [cartIDList, Quantity] = await db1.query(sql1);
            console.log("cartIDList");
            console.log(cartIDList);
            console.log("Quantity");
            console.log(Quantity);
            
            return NextResponse.json({cartIDList: cartIDList}, {status: 200})

        }
        
    } catch (error: any) { return NextResponse.json({ message: "Error", error: error }, {status: 500}); }

}