"use server"

import { NextRequest, NextResponse } from "next/server"
import { findRelatedWords } from "@/../lib/wordNet"


export async function POST(req: NextRequest) {
    try {
        
        const res = await req.json()
        const searchWord = res.searchWord
        
        console.log("popopopopopopopopopop 1");
        console.log(searchWord);
        console.log("popopopopopopopopopop 2");
        

        if (!searchWord) { return NextResponse.json({success: false}) }
        
        let response = await findRelatedWords(searchWord)
        // console.log("vl");
        // console.log(response);
        // console.log(response);
        
                
        return NextResponse.json({defintion: response}, {status: 200})


    } catch (error: any) { console.log(error); return NextResponse.json({ message: "Error", error: "Verify input data" }, {status: 500}); }

}

export async function GET() {
    return NextResponse.json({ImgBytes: "response"}, {status: 200})
}