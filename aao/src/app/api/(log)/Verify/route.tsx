import {createConnection} from "@/../lib/db" 
import { NextResponse } from "next/server";

var jwt = require('jsonwebtoken');


export async function POST(req: Request) {
    try {

        const res = await req.json()
        const tkn = res.tkn
        const userID = res.userID

        const db = await createConnection();
        const sql = 'select * from user where idUser = ' + userID + ' ;'
        console.log(sql);
                
        const user = await db.query(sql); 
        console.log(user);
        

        try {
            let decoded = jwt.verify(tkn, user[0][0].password)

            console.log("decoded");
            console.log(decoded);
    
            return NextResponse.json({user: decoded}, {status: 200})
        } catch (e: any) { console.log(e); return NextResponse.json({ message: "Error", error: "Token expired" }, {status: 500}); }


    } catch (error: any) { console.log(error); return NextResponse.json({ message: "Error", error: "Verify userid and token" }, {status: 500}); }

}