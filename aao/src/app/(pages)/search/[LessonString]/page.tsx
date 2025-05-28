"use client"

import SearchingPage from "@/components/searchinPage/SearchingPage"

export default async function SearchPageByLessonString ({params} : {
    params: Promise<{ LessonString: string }>
}) {

    const category = (await params).LessonString

    return (
        <div>
            <SearchingPage params={category} />
        </div>
    )

}