"use server"

import {createConnection} from "@/../lib/db" 
import { Description, Email } from "@mui/icons-material"
import { NextRequest, NextResponse } from "next/server"
import { cookies } from 'next/headers'
import { log } from "node:console"


export async function POST(req: NextRequest) {
    try {
        
        const data = await req.formData()
        const imgID = data.get('idIMG')
        const imgTitle = data.get('FileName')

        const file: File | null = data.get('file') as unknown as File


        if (!imgID) { return NextResponse.json({success: false}) }
        if (!file) { return NextResponse.json({success: false}) }
        // if (!description) description = "No description"


        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        


        let sql = 'UPDATE imgs SET images = ?, imgName = ? WHERE idIMGS = ?;'



        const db = await createConnection();
        let values = [buffer, imgTitle, imgID]; 
        let vl = await db.query(sql, values);
        console.log("vl");
        const idImg = vl[0].insertId
        console.log(idImg);

 
        return NextResponse.json({status: 200})

    } catch (error: any) { console.log(error); return NextResponse.json({ message: "Error", error: "Verify input data" }, {status: 500}); }

}