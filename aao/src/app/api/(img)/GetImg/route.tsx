"use server"

import {createConnection} from "@/../lib/db" 
import { NextRequest, NextResponse } from "next/server"


export async function POST(req: NextRequest) {
    try {
        
        const data = await req.formData()
        const idIMGs = data.get('idIMG')

        
        if (!idIMGs) { return NextResponse.json({success: false}) }
        
        const sql = 'SELECT images, imgName FROM imgs where idIMGS = ' + idIMGs + ';';
        console.log("idIMGs");
        console.log(idIMGs);
        

        const db = await createConnection();
        let vl = await db.query(sql);
        console.log("vl");
        console.log(vl);
        // console.log(vl[0]);
        // console.log(vl[0][0]['images']);
        // console.log('vl[0]["images"]');
        // console.log(vl[0][0].images);       
                
        return NextResponse.json({ImgBytes: vl[0][0]['images']}, {status: 200})


    } catch (error: any) { console.log(error); return NextResponse.json({ message: "Error", error: "Verify input data" }, {status: 500}); }

}