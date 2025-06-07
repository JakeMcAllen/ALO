"use server"

import {createConnection} from "@/../lib/db" 
import { Email } from "@mui/icons-material"
import { NextResponse } from "next/server"
import { cookies } from 'next/headers'

// import {jwt} from jsonwebtoken
var jwt = require('jsonwebtoken');



export async function POST(req: Request) {
    try {
        const res = await req.json()  
        const E_Mail = res.E_Mail
        const password = res.Password

        if (E_Mail === undefined || E_Mail === "" || password === undefined || password === "") return NextResponse.json({ message: "Error", error: "Lack same info" }, {status: 500});

        const db = await createConnection();
        const sql = 'select * from user where Mail="' + E_Mail + '" and password="' + password + '" ;'
        // console.log(sql);

        const [user] = await db.query(sql); 
        // console.log("user");

        const usVal: any = user[0]
        const uID: number = usVal.idUser
        const nmV: string = usVal.Name

        try {

            let tkn1 = jwt.sign({ 
                users: {
                    "idUser": uID,
                    "Name": nmV,
                    "Surname": usVal.Surname
                }, 
                exp: Math.floor(Date.now() / 1000) + (60 * Number(process.env.MINUTE_TO_EXPIRATION_JWT_KEY) )
                // exp: Math.floor(Date.now() / 1000) + (60 * 1) 
            }, 
            password);

            console.log("exit");
            console.log(tkn1);
            

            return NextResponse.json({token: tkn1, userID: uID, Name: nmV}, {status: 200})

        } catch (e: any) { console.log(e); }

        return NextResponse.json({ message: "Error", error: "Error on token generation " }, {status: 500});

    } catch (error: any) { return NextResponse.json({ message: "Error", error: "VERIFY INPUT DATA" }, {status: 500}); }

}