"use server"

import {createConnection} from "@/../lib/db" 
import { NextResponse } from "next/server"


export async function POST(req: Request) {
    try {
        const res = await req.json()  
        const idLesson = res.idLesson

        const db = await createConnection();
        const sql = 'Select * from Lesson where idLesson = ' + idLesson; 
        console.log(sql);
        
        const lesson = await db.query(sql);
        return NextResponse.json({lesson: lesson}, {status: 200})

    } catch (error: any) { return NextResponse.json({ message: "Error", error: error }, {status: 500}); }

}