"use server"

import {createConnection} from "@/../lib/db" 
import { NextResponse } from "next/server"


export async function POST(req: Request) {
    try {
        const res = await req.json()  
        
        const LessonID = res.LessonID;

        if (!LessonID) return NextResponse.json({ message: "No one lessonID" }, { status: 404 });


        const db = await createConnection();
        const sql = 'select a.ArticleID, a.Title, a.Content, l.ObjOrder ' +
                    'from article as a LEFT JOIN lesson_obj as l on a.ArticleID = l.ArticleID ' +
                    'WHERE l.LessonID = ' + LessonID + ' ORDER BY l.ObjOrder'; 
        console.log(sql)
        const [lesson_objs] = await db.query(sql);


        return NextResponse.json({lesson_objs_OPT: lesson_objs}, {status: 200})

    } catch (error: any) { 
        return NextResponse.json({ message: "Error", error: error }, { status: 500 });
    }

}