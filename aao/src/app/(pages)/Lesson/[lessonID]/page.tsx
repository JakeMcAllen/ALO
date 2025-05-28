"use client"

import LessonPage from "@/components/Lesson/LessonPage"


export default async function Page({
    params,
  }:{
    params: Promise<{ lessonID: number }>
  }) {
    const itmID = (await params).lessonID

    console.log(itmID);
    


  return (
    <div style={{margin: "5%"}}>
        <LessonPage itmID={itmID} />
    </div>
  )

}