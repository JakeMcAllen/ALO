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
    setDT: Dispatch<React.SetStateAction<string | undefined>>
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


            // TODO: imgs to fix
            // let json = JSON.stringify({ "idFurniture": idF });
            // const responseImg = await axios.post('/api/GetImg', json, { headers: { 'Content-Type': 'application/json', }, });
        

            // // Funzione per convertire il Buffer in base64
            // const byteArrayToBase64 = (byteArray: number[]): string => {
            //     const buffer = Buffer.from(byteArray); // Crea un Buffer dai byte
            //     return `data:image/jpeg;base64,${buffer.toString('base64')}`; // Converte in base64
            // };


            // if (responseImg.status === 200) {
            //     console.log('Message Images');

            //     if (responseImg.data.ImgBytes[0]) {
                
            //         let fnt = responseImg.data.ImgBytes[0].images.data
            //         console.log(fnt)

            //         setIsPresent(true)
            //         setDT( byteArrayToBase64(fnt) )
            //     }
            // }



        } else { console.error('Failed to send message'); }
    } catch (error) { console.error('Error sending message:', error); }
    setIsLoading(false)
}