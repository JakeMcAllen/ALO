"use server"

import {createConnection} from "@/../lib/db" 
import { NextResponse } from "next/server"


export async function POST(req: Request) {
    try {
        const res = await req.json()  
        const ArticleID = res.ArticleID

        const db = await createConnection();
        const sql = 'Select * from Article where ArticleID = ' + ArticleID; 
        console.log(sql);
        
        const article = await db.query(sql);
        return NextResponse.json({article: article}, {status: 200})

    } catch (error: any) { return NextResponse.json({ message: "Error", error: error }, {status: 500}); }

}