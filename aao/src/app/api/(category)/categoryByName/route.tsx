"use server"

import {createConnection} from "@/../lib/db" 
import { NextResponse } from "next/server"


export async function POST(req: Request) {
    try {        
        const res = await req.json()        
        const catName = res.categoryName === undefined ? "" : res.categoryName;
        
        console.log("catName");
        console.log(catName);
        

        const db = await createConnection();
        const sql = 'select * from category where Name="' + catName + '"'; 
        console.log(sql);

        const [category] = await db.query(sql);
        return NextResponse.json({category: category}, {status: 200})

    } catch (error: any) { return NextResponse.json({ message: "Error", error: error }, {status: 500}); }

}