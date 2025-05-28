"use server"

import {createConnection} from "@/../lib/db" 
import { NextResponse } from "next/server"


export async function POST(req: Request) {
    try {
        const res = await req.json()
        const lesson = res.lesson === undefined ? 0 : res.lesson;
        
        const f4p: number = res.lesson4Page === undefined ? Number(process.env.DEFAULT_lesson_4_PAGE) : res.lesson4Page;
        const pag = res.pag === undefined ? 0 : Number(res.pag) * f4p;
        const lesson4Page = res.lesson4Page === undefined ? f4p : Number(res.lesson4Page)
        const onlyIDs = res.onlyIDs === undefined ? true : Boolean(res.onlyIDs)
        

        const db = await createConnection();
        
        let sql = 'Select ' + (onlyIDs ? 'idLesson' : '*') + 
            ' from lesson ' + 
            (lesson.toLowerCase() === "altro" ? "" :
                'where lesson in (select idlesson from lesson where Name="' + lesson + '" ) ' 
            ) + 
            'limit ' + lesson4Page + ' offset ' + pag + ' ; ';
        console.log(sql);
        
        const [lessonIDList] = await db.query(sql);


        const sql1 = 'Select ROUND(count(*)/ ' + f4p.toString() + ' , 0) as pags ' + 
            ' from lesson ' + 
            (lesson.toLowerCase() === "altro" ? "" :
                'where lesson in (select idlesson from lesson where Name="' + lesson + '" ) ' 
            ) 
        console.log(sql1);
        
        const [pags] = await db.query(sql1);
        console.log(pags[0].pags);


        return NextResponse.json({lessonIDList: lessonIDList, pags: pags[0].pags}, {status: 200})

    } catch (error: any) { return NextResponse.json({ message: "Error", error: error }, {status: 500}); }

}