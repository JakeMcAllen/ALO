"use client"

import Link from "next/link";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Button, CardMedia, CircularProgress, Grid, Grid2, Typography } from '@mui/material';
import { ProductShow } from "../Shop/ProductShow";
import { useEffect, useState } from "react";
import axios from "axios";
import StandardImageList from "./StandardImageList";
import Textcanvas from "../text/Textcanvas";
import MainTextcanvas from "../text/MainTextCanvas";
import { Article_interface } from "../text/extra/Article_interface";

export default function LessonPage( {itmID}:{itmID: number} ) {


    
    const [id, setID] = useState<number>(itmID);
    const [Title, setTitle] = useState<String>("");
    const [Category, setCategory] = useState<String>("");
    const [description, setDescription] = useState<String>("");

    // Img loading variables
    const [dt, setDT] = useState<string>();
    const [isLoading, setIsLoading] = useState<Boolean>(false);

    // article loading
    const [articles, setArticles] = useState<Article_interface[]>([]);



    useEffect(() => {
        const fetchData = async () => {

            setIsLoading(true)
            try {
                const json = JSON.stringify({ "idLesson": itmID });
                const response = await axios.post('/api/lesson', json, { headers: { 'Content-Type': 'application/json', }, });
            
                if (response.status === 200) {
                    console.log('Message Lessons');
                    let fnt = response.data.lesson[0][0]

                    setID(fnt.idLesson)
                    setTitle(fnt.Title)
                    setCategory(fnt.Category)
                    setDescription(fnt.Description)


                    try {
                        const json = JSON.stringify({ "LessonID": itmID });
                        const response = await axios.post('/api/lessonObj_OPT', json, { headers: { 'Content-Type': 'application/json', }, });

                        if (response.status === 200) {
                            console.log("response.data.lesson_objs_OPT");
                            console.log(response.data.lesson_objs_OPT);

                            setArticles(response.data.lesson_objs_OPT)

                        } else { console.error('Failed to send message'); }


                    } catch (error) { console.error('Error reload the page:', error); }



                    // TODO: imgs to fix
                    // let json = JSON.stringify({ "idLesson": itmID });
                    // const responseImg = await axios.post('/api/GetImg', json, { headers: { 'Content-Type': 'application/json', }, });
                

                    // // Funzione per convertire il Buffer in base64
                    // const byteArrayToBase64 = (byteArray: number[]): string => {
                    //     const buffer = Buffer.from(byteArray); // Crea un Buffer dai byte
                    //     return `data:image/jpeg;base64,${buffer.toString('base64')}`; // Converte in base64
                    // };


                    // if (responseImg.status === 200) {
                    //     console.log('Message Images');

                    //     // TODO: No img ?

                    //     let fnt = responseImg.data.ImgBytes[0].images.data

                    //     setDT( byteArrayToBase64(fnt) )
                    // }



                } else { console.error('Failed to send message'); }
            } catch (error) { console.error('Error sending message:', error); }
            setIsLoading(false)
        }
    
        fetchData()
    }, [])


    return (
        <>
            <Link
                href={"/shop"}
                style={{
                    textDecoration: "none",
                    color: "black",
                }}
            >
                <Grid2 container direction="row" spacing={2}>
                    <KeyboardBackspaceIcon />
                    <Typography style={{width: "100px"}}>Shop</Typography>
                </Grid2>
            </Link>
            <Grid2
                container direction="column"
                sx={{
                    justifyContent: "flex-start",
                    alignItems: "center",
                }}
                style={{margin: "20px 0 50px 0"}}
            >
                <Typography variant="h2">{Title}</Typography>
                <Typography variant="subtitle1">{description}</Typography>
                <>
                    {/* <MainTextcanvas articleToDisplay={articles} /> */}
                    {articles.map((artcl: Article_interface, index: number) => (
                        <Textcanvas key={index} textToDisp={artcl.Content} Title={artcl.Title} />
                    ))}
                </>
            </Grid2>
            <Grid2>
                <Typography variant="h2" style={{marginBottom: "20px"}}>Other lessons: </Typography>
                <ProductShow />
            </Grid2>
        </>
    )

}