"use server"

import {createConnection} from "@/../lib/db" 
import { NextResponse } from "next/server"


export async function GET() {
    try {
        const db = await createConnection();
        const sql = "Select idLesson from lesson"
        console.log(sql);
        
        const [lessonIDList] = await db.query(sql)        
        return NextResponse.json({lessonIDList: lessonIDList}, {status: 200})

    } catch(error: any) { 
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}

export async function POST(req: Request) {
    try {
        const res = await req.json()  
        
        const f4p: number = res.lesson4Page === undefined ? Number(process.env.DEFAULT_lesson_4_PAGE) : res.lesson4Page;
        const pag = res.pag === undefined ? 0 : Number(res.pag) * f4p;
        const lesson4Page = res.lesson4Page === undefined ? f4p : Number(res.lesson4Page)
        
        const db = await createConnection();
        const sql = 'SELECT idLesson from lesson limit ' + lesson4Page + ' offset ' + pag; 
        console.log(sql)
        const [lessonIDList] = await db.query(sql);

        const sql1 = 'Select ROUND(count(*)/ ' + f4p.toString() + ' , 0) as pags from lesson;';
        const [pags] = await db.query(sql1);
        console.log(pags[0].pags);
        


        return NextResponse.json({lessonIDList: lessonIDList, pags: pags[0].pags}, {status: 200})

    } catch (error: any) { 
        return NextResponse.json({ message: "Error", error: error }, { status: 500 });
    }

}