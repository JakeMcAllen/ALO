"use server"

import {createConnection} from "@/../lib/db" 
import { NextResponse } from "next/server"


export async function POST(req: Request) {
    try {
        const res = await req.json()  
        
        const LessonID = res.LessonID;

        if (!LessonID) return NextResponse.json({ message: "No one lessonID" }, { status: 404 });


        const db = await createConnection();
        const sql = 'select ObjOrder, ArticleID, IMG_ID from Lesson_OBJ where LessonID= ' + LessonID; 
        console.log(sql)
        const [lesson_objs] = await db.query(sql);


        return NextResponse.json({lesson_objs: lesson_objs}, {status: 200})

    } catch (error: any) { 
        return NextResponse.json({ message: "Error", error: error }, { status: 500 });
    }

}