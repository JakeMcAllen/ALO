"use server"

import {createConnection} from "@/../lib/db" 
import { Email } from "@mui/icons-material"
import { NextResponse } from "next/server"
import { cookies } from 'next/headers'


export async function POST(req: Request) {
    try {
        const res = await req.json()  
        
        const name = res.Name
        const lastName = res.LastName
        const E_Mail = res.E_Mail
        const password = res.Password

        const db = await createConnection();
        const sql = 'INSERT INTO user (Name, Surname, Mail, password) VALUES ("' + name + '", "' + lastName + '", "' + E_Mail + '", "' + password + '" );'
        console.log(sql);
        
        await db.query(sql); 

        // const currentDate = new Date();
        // let dt = currentDate.setTime(currentDate.getTime() + Number(process.env.EXPIRATION_HOURS_LOGIN) * 60 * 60 * 1000);
        
        // const cookieStore = await cookies()
        // cookieStore.set("IdUsers", user[0]["insertId"], {expires: dt})

        
        return NextResponse.json({status: 200})

    } catch (error: any) { return NextResponse.json({ message: "Error", error: "Verify input data" }, {status: 500}); }

}