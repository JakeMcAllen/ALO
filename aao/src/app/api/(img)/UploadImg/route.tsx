"use server"

import {createConnection} from "@/../lib/db" 
import { Description, Email } from "@mui/icons-material"
import { NextRequest, NextResponse } from "next/server"
import { cookies } from 'next/headers'
import { log } from "node:console"


export async function POST(req: NextRequest) {
    try {
        
        const data = await req.formData()
        const idFurniture = data.get('idFurniture')
        var description = data.get('description')
        const MainImgID: string = (data.get('isMainIng') || "false") as string;
        const HotelImg: string = (data.get('isHotel') || "false") as string;

        const file: File | null = data.get('file') as unknown as File


        if (!idFurniture) { return NextResponse.json({success: false}) }
        if (!file) { return NextResponse.json({success: false}) }
        if (!description) description = "No description"

       
        console.log("MainImgID: ");
        console.log(MainImgID);

        console.log("HotelImg: ");
        console.log(HotelImg);


        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        let sql = ''
        if (HotelImg == "true") { sql ='INSERT INTO imgs (description, images, Hotel_idHotel) VALUES (?, ?, ?)'; }
        else { sql ='INSERT INTO imgs (description, images, FurnitureID) VALUES (?, ?, ?)'; }

        const db = await createConnection();
        let values = [description, buffer, idFurniture]; 
        let vl = await db.query(sql, values);
        console.log("vl");
        const idImg = vl[0].insertId
        console.log(idImg);

 
        
        

        if (MainImgID == "true") {
            if (HotelImg == "true") sql ='UPDATE hotel SET MainImg = ? WHERE idHotel= ?';
            else sql = 'UPDATE furniture SET MainImgID = ? WHERE furnitureID= ?';

            console.log(sql);
            

            const db = await createConnection();
            values = [idImg, idFurniture]; 
            console.log(values);
            
            
            let vl2 = await db.query(sql, values);
            console.log("vl2");
            console.log(vl2[0]);
        }


                
        return NextResponse.json({status: 200})

    } catch (error: any) { console.log(error); return NextResponse.json({ message: "Error", error: "Verify input data" }, {status: 500}); }

}