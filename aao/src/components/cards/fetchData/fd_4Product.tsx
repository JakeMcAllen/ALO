"use client"

import axios from "axios";
import { Dispatch, SetStateAction } from "react";




export async function fetchData_forLesson (
    setIsLoading: Dispatch<SetStateAction<Boolean>>,
    setIsPresent: Dispatch<React.SetStateAction<Boolean>>,
    idF: number,
    setID: Dispatch<React.SetStateAction<number>>,
    setName: Dispatch<React.SetStateAction<String>>,
    setPrice: Dispatch<React.SetStateAction<number>>, 
    setDescription: Dispatch<React.SetStateAction<String>>,
    setDT: Dispatch<React.SetStateAction<string | undefined>>,
    setIsComplete: Dispatch<React.SetStateAction<boolean>>,
    GetImg: (imgID_local: number) => void
) {
    
    setIsLoading(true)
    try {
        const json = JSON.stringify({ "idLesson": idF });
        const response = await axios.post('/api/lesson', json, { headers: { 'Content-Type': 'application/json', }, });
        setIsPresent(false)

        if (response.status === 200) {           
            
            let fnt = response.data.lesson[0][0]

            setID(fnt.idLesson)
            console.log("fnt.idLesson");
            console.log(fnt.idLesson);
            
            setName(fnt.Title)
            setPrice(0)
            setDescription(fnt.Description)

            if (fnt.MainIMG) GetImg(fnt.MainIMG)

            console.log("\n\n\n\n\nn\n\n\n\n\: ", fnt);
            
            
            const json1 = JSON.stringify({ "idLesson": idF, "UserID": 1 });
            console.log("json1: ", json1);
            
            const response1 = await axios.post('/api/GetUsers_progress_on_lesson', json1, { headers: { 'Content-Type': 'application/json', }, });

            
            if (response1.status === 200) {           
                console.log("response1: ", response1);
                

                fnt = response1.data.users_progress_on_lesson[0][0]
                if (fnt != undefined){
                    
                    console.log("response1.data.users_progress_on_lesson: ", response1.data.users_progress_on_lesson.length);

                    // setProgress()
                    setIsComplete(fnt.Complete)
                }



            }


        } else { console.error('Failed to send message'); }
    } catch (error) { console.error('Error sending message:', error); }
    setIsLoading(false)
}