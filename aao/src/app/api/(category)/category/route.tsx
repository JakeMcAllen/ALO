"use server"

import {createConnection} from "@/../lib/db" 
import { log } from "console";
import { NextResponse } from "next/server"


export async function GET() {
    try {
        console.log("1");
        
        const db = await createConnection();
        const sql = 'select * from category'; 
        console.log("1");
        console.log(sql);
        
        const [category] = await db.query(sql);
        return NextResponse.json({category: category}, {status: 200})

    } catch (error: any) { return NextResponse.json({ message: "Error", error: error }, {status: 500}); }

}