"use client"

import { Button, Card, CardActions, CardContent, CardMedia, CircularProgress, Grid, Paper, styled, Typography } from "@mui/material"
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import BigButton from "../Button/BigButton";
import axios from "axios"; // Importa axios per le chiamate API
import { fetchData_forLesson } from "./fetchData/fd_4Product";

export default function LessonCard({idF}:{idF: number} ) {

    const [id, setID] = useState<number>(0);
    const [name, setName] = useState<String>("");
    const [price, setPrice] = useState<number>(-1);
    const [description, setDescription] = useState<String>("");
    const [IsComplete, setIsComplete] = useState<boolean>(false);
    
    // Img loading variables
    const [imgIDCover, setImgIDCover] = useState<number>(-1);
    const [dt, setDT] = useState<string>();
    const [isPresent, setIsPresent] = useState<Boolean>(false);
    const [isLoading, setIsLoading] = useState<Boolean>(false); // Gestisce il caricamento generale
    const [isImageLoading, setIsImageLoading] = useState<Boolean>(false); // Nuovo stato per il caricamento dell'immagine



    // Funzione per il fetching dell'immagine, adattata dal tuo ImageBox
    const GetImg = async (imgID_local: number) => {
        setIsImageLoading(true); // Inizia il caricamento dell'immagine
        console.log("Fetching image for ID:", imgID_local);
        
        try {
            const formatData = new FormData();
            formatData.append("idIMG", imgID_local.toString());

            // Utilizziamo la chiamata axios esattamente come l'hai specificata
            const response: any = await axios.post('/api/GetImg', formatData, { headers: { 'Content-Type': 'multipart/form-data' }, });
            
            if (response.status === 200 && response.data.ImgBytes) {
                const imgData = response.data.ImgBytes;
                
                // Controlla se la proprietà 'data' esiste e se è un array (come nel tuo riferimento)
                if (imgData.data && Array.isArray(imgData.data)) {
                    // Crea un Buffer dal tuo array di dati
                    const buffer = Buffer.from(imgData.data);
                    
                    // Converte il Buffer in una stringa Base64
                    const base64Image = buffer.toString('base64');
                    
                    // Determina il tipo MIME dell'immagine. Potresti volerlo salvare nel DB o dedurlo.
                    // Per semplicità, assumiamo che siano JPEG o PNG dai primi byte del buffer.
                    let mimeType = 'image/jpeg'; // Default
                    if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47) {
                        mimeType = 'image/png';
                    } else if (buffer[0] === 0x47 && buffer[1] === 0x49 && buffer[2] === 0x46) {
                        mimeType = 'image/gif';
                    }
                    
                    const dataUrl = `data:${mimeType};base64,${base64Image}`;
                    setDT(dataUrl); // Aggiorna lo stato per visualizzare l'immagine
                    setIsPresent(true); // Indica che l'immagine è presente
                    console.log("Image data successfully converted and set.");
                } else {
                    console.warn("ImgBytes.data is not an array or is missing.");
                    setIsPresent(false);
                    setDT(""); // Nessun dato immagine valido
                }
            } else {
                console.log('No image data found or invalid response status.');
                setIsPresent(false);
                setDT(""); // Nessuna immagine da visualizzare
            }
        } catch (error) {
            console.error('Error fetching image:', error);
            setIsPresent(false);
            setDT(""); // In caso di errore, assicurati che l'immagine non venga visualizzata
        } finally {
            setIsImageLoading(false); // Fine caricamento immagine
        }
    };


    useEffect(() => {
        // Quando il componente si monta, esegui il fetching di tutti i dati
        fetchData_forLesson(setIsLoading, setIsPresent, idF, setID, setName, setPrice, setDescription, setDT, setIsComplete, GetImg)
    }, []); // Esegui fetchData_forLesson quando idF (e quindi fetchData_forLesson stessa) cambia





    return (
        <Card sx={{ maxWidth: 345 }} style={{border: IsComplete ? "5px green solid" : "", padding: "5px", borderRadius: "15px"}}>
            <Link href={"/Lesson/" + id }>
                {isImageLoading ? // Mostra il CircularProgress se l'immagine è in caricamento
                    <CircularProgress sx={{ display: 'block', margin: 'auto', mt: 2, mb: 2 }} />
                    : isPresent && dt ? // Se l'immagine è presente e l'URL non è nullo
                        <img 
                            src={dt} 
                            alt={`Lesson ${idF}`} // Aggiunto alt text per accessibilità
                            style={{height: 100, width: 310, margin: "5px 0 5px 20px", borderRadius: "10px", objectFit: 'cover'}} // Aggiunto objectFit
                        />
                        : // Altrimenti, mostra l'immagine di default (se non c'è immagine e non sta caricando)
                        <CardMedia
                            style={{height: 100, width: 310, margin: "5px 0 5px 20px", borderRadius: "10px"}}
                            image={process.env.NEXT_PUBLIC_DEFUALT_IMG_URL || '/default-lesson-image.png'} // Fallback se la variabile d'ambiente non è definita
                            title="Lesson image"
                        />
                }
            </Link>
            <Grid 
                container
                direction="row"
                sx={{
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
            >
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {description}
                    </Typography>
                </CardContent>
                <Grid 
                    container
                    direction="row"
                    sx={{
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Typography 
                        style={{marginRight: "20px", marginLeft: "10px"}}
                    >
                        {price} €
                    </Typography>
                    <>
                        {IsComplete ? 
                            <Typography style={{color: "green", marginRight: "5px"}}>Complete</Typography>
                            : null
                        }
                    </>
                </Grid>
            </Grid>
            <CardActions>
                <BigButton
                    path={"/Lesson/" + id }
                    text={"Scopri"}
                />
            </CardActions>
        </Card>
    )
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
}));