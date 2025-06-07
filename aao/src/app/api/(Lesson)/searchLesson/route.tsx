"use server"

import {createConnection} from "@/../lib/db" 
import { NextResponse } from "next/server"


export async function POST(req: Request) {
    try {
        const res = await req.json()
        const Title = res.nameVal
        const descriptionVal = res.descriptionVal

        console.log("Title");
        console.log(Title);
        console.log(descriptionVal);
        console.log("descriptionVal");
        
        

        if (Title == undefined && descriptionVal == undefined) return NextResponse.json({ message: "Error", error: "Invalid input values" }, {status: 500});


        const db = await createConnection();
        let sql = 'Select idLesson from lesson where Title LIKE "%' + Title + '%" OR Description LIKE "%' + descriptionVal + '%" LIMIT 10; ';
        console.log(sql);
        
        const [cartIDList] = await db.query(sql);
        console.log(cartIDList);
        

        return NextResponse.json({cartIDList: cartIDList}, {status: 200})

    } catch (error: any) { return NextResponse.json({ message: "Error", error: error }, {status: 500}); }

}