"use server"

import {createConnection} from "@/../lib/db" 
import { Email } from "@mui/icons-material"
import { NextResponse } from "next/server"
import { cookies } from 'next/headers'


export async function POST(req: Request) {
    try {
        
        console.log("Upload Furniture");
        
        const data = await req.formData()
        const Name = data.get('Name')
        var Price = data.get('Price')
        var Description = data.get('Description')
        var CategoryID = data.get('CategoryID')
        

        if (!Name || !Price || !Description || !CategoryID) { return NextResponse.json({success: false}) }
        

        const db = await createConnection();
        const sql = 'INSERT INTO furniture (Name, Price, Description, CategoryID) VALUES ("' + Name + '", ' + Price + ', "' + Description + '", ' + CategoryID + ');'
        console.log(sql);
        
        await db.query(sql); 
        
        return NextResponse.json({status: 200})

    } catch (error: any) { return NextResponse.json({ message: "Error", error: "Verify input data" }, {status: 500}); }

}