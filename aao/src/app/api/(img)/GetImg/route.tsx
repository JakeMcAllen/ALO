"use server"

import {createConnection} from "@/../lib/db" 
import { NextRequest, NextResponse } from "next/server"


export async function POST(req: NextRequest) {
    try {
        
        const res = await req.json()
        const idArticle = res.idArticle
        
        if (!idArticle) { return NextResponse.json({success: false}) }
        
        const sql = 'SELECT * FROM imgs where ArticleID=' + idArticle + ';';

        const db = await createConnection();
        let vl = await db.query(sql);
        console.log("vl");
        console.log(vl);
        console.log(vl[0].insertId);
        
                
        return NextResponse.json({ImgBytes: vl[0]}, {status: 200})


    } catch (error: any) { console.log(error); return NextResponse.json({ message: "Error", error: "Verify input data" }, {status: 500}); }

}