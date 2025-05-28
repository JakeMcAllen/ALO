"use server"

import {createConnection} from "@/../lib/db" 
import { NextResponse } from "next/server"


export async function POST(req: Request) {
    try {
        const res = await req.json()
        const UserID = res.UserID
        const FornitureID = res.FornitureID
        const Quantity = res.Quantity
        
        if (UserID == undefined || FornitureID == undefined || Quantity == undefined) return NextResponse.json({ message: "Error", error: "Invalid user id, FornitureID or Quantity" }, {status: 500});



        const db = await createConnection();
        let sql = 'select sum(Quantity) as isPresent from cart where User_idUser=' + UserID + ' and Furniture_furnitureID=' + FornitureID + '; ';
        console.log(sql);
        const [cartIDList] = await db.query(sql);
        console.log(cartIDList[0].isPresent);
        


        if (cartIDList[0].isPresent) {
            // The item is already present and must be increment/decrease the number
            
            const newQuantity = Number(cartIDList[0].isPresent) + Quantity
            if (newQuantity <= 0) {
                // If quantity is zero or less make a delete operation

                const db1 = await createConnection();
                let sql1 = 'DELETE FROM cart WHERE User_idUser= ' + UserID + ' and Furniture_furnitureID= ' + FornitureID + ' ; ';
                console.log("sql1");
                console.log(sql1);
                
                const [cartIDList1] = await db.query(sql1);
                console.log("cartIDList");
                console.log(cartIDList1);
                
                return NextResponse.json({cartIDList: cartIDList1}, {status: 200})

            } else {
                // If quantity is more than zero make the increment

                const db1 = await createConnection();
                let sql1 = 'UPDATE cart SET Quantity= ' + newQuantity + ' WHERE User_idUser=' + UserID + ' and Furniture_furnitureID=' + FornitureID + '; ';
                console.log(sql1);
                
                const [cartIDList1] = await db1.query(sql1);
                console.log("cartIDList");
                console.log(cartIDList1);
                
                return NextResponse.json({cartIDList: cartIDList1}, {status: 200})

            }
            

        } else { 
            // The item is not present and can be insert

            if (Quantity <= 0) return NextResponse.json({ message: "Error", error: "Quantity is negative and it's not possibile to add a furniture" }, {status: 500});


            const db1 = await createConnection();
            let sql1 = 'INSERT INTO cart (User_idUser, Furniture_furnitureID, Quantity) VALUES (' + UserID + ', ' + FornitureID + ', ' + Quantity + '); ';
            console.log(sql1);
            
            const [cartIDList1, qnt] = await db1.query(sql1);
            console.log("cartIDList");
            console.log(cartIDList1);
            console.log("qnt");
            console.log(qnt);
            
            return NextResponse.json({cartIDList: cartIDList1}, {status: 200})
        }
        
        
    } catch (error: any) { return NextResponse.json({ message: "Error", error: error }, {status: 500}); }

}