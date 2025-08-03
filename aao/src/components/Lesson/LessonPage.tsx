"use client"

import Link from "next/link";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Avatar, Box, Button, Card, CardMedia, CircularProgress, Grid, Grid2, Typography } from '@mui/material'; // Rimosso Grid2 che non sembra essere importato correttamente
import { ProductShow } from "../Shop/ProductShow";
import { useEffect, useRef, useState, useCallback } from "react"; // Aggiunto useCallback
import axios from "axios";
import Textcanvas from "../text/Textcanvas";
import { Article_interface } from "../text/extra/Article_interface";
import ImageDisp from "./ImageDisp";
import ExerciseBox from "../Creation/Exercise/ExerciseBox";
// import { tree } from "next/dist/build/templates/app-page"; // Rimosso import non utilizzato
import { getCookie } from "cookies-next";
// import { log } from "console"; // Rimosso import non utilizzato
// import { ViewCarousel } from "@mui/icons-material"; // Rimosso import non utilizzato
import SliderComponent from "../DynamicSliderPage/DynamicSliderPage";


export default function LessonPage({ itmID }: { itmID: number }) {
    const [id, setID] = useState<number>(itmID);
    const [Title, setTitle] = useState<String>("");
    const [Category, setCategory] = useState<String>("");
    const [description, setDescription] = useState<String>("");

    const [isLoading, setIsLoading] = useState<Boolean>(true);
    const [articles, setArticles] = useState<Article_interface[]>([]);

    // Ref per l'elemento Typography h2
    const otherLessonsRef = useRef<HTMLHeadingElement>(null);
    const [hasScrolledToOtherLessons, setHasScrolledToOtherLessons] = useState(false);
    // setFlagScroll non è più necessario con l'Intersection Observer per la visibilità

    const [isLessonCompleted, setIsLessonCompleted] = useState(false);
    const [exsLength, setExsLength] = useState<number[]>([])
    const [exNumb_MAX, setExNumb_MAX] = useState<number>(0)
    const [flagEx, setFlagEx] = useState(false); // Check if all ex are made ... if present


    // BuyLessonPage
    const [buyLessonFlag, setBuyLessonFlag] = useState<boolean>(false);
    const [price, setPrice] = useState<number>(0);
    const [buyErrorFlag, setbuyErrorFlag] = useState<boolean>(false);



    /* Page type
        0 == normal
        1 == slide page
    */
    // TODO: page type
    const [isPageType, setIsPageType] = useState<number>(0);
    const [SlidePageNumbFlag, setSlidePageNumbFlag] = useState<boolean>(false)
    


    // Manager per vedere che tutti i gli ex siano stati completati
    const setAllExCompletedManager = useCallback(async (exComplID: number) => {

        setExsLength(prevExsLength => {
            const temp = [...prevExsLength]; // Crea una copia per evitare mutazioni dirette dello stato
            temp[exComplID] = 1;
            return temp;
        });
        setFlagEx(true);
        updateLessonComplete()

    }, []);



    // IMG: 
    const [imgIDCover, setImgIDCover] = useState<number>(-1);
    const [dt, setDT] = useState<string>();
    const [isPresent, setIsPresent] = useState<Boolean>(false);
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



    // Funzione per il fetching dei dati
    const fetchData = useCallback(async () => {
        try {
            const json = JSON.stringify({ "idLesson": itmID });
            const response = await axios.post('/api/lesson', json, { headers: { 'Content-Type': 'application/json', }, });

            if (response.status === 200) {
                let fnt = response.data.lesson[0][0];

                setID(fnt.idLesson);
                setTitle(fnt.Title);
                setCategory(fnt.Category);
                setDescription(fnt.Description);
                
                setIsPageType(fnt.Format)

                // IMG
                if (fnt.MainIMG) { GetImg(fnt.MainIMG); setImgIDCover(fnt.MainIMG); }


                try {
                    const jsonArticles = JSON.stringify({ "LessonID": itmID });
                    const articlesResponse = await axios.post('/api/lessonOBJ4Lesson', jsonArticles, { headers: { 'Content-Type': 'application/json', }, });

                    if (articlesResponse.status === 200) {
                        const allContent = [
                            ...(articlesResponse.data.lessons ? articlesResponse.data.lessons[0] : []),
                            ...(articlesResponse.data.imgs ? articlesResponse.data.imgs[0] : []),
                            ...(articlesResponse.data.exs ? articlesResponse.data.exs[0] : []),
                        ];
                        let setVals = allContent.sort((n1: any, n2: any) => { return n1.Type - n2.Type })
                        const sortedContent = setVals.sort((a: any, b: any) => { return a.ObjOrder - b.ObjOrder; })
                        

                        setExNumb_MAX(articlesResponse.data.exs[0].length)
                        setExsLength(new Array(articlesResponse.data.exs[0].length).fill(-1))

                        if (articlesResponse.data.exs[0].length === 0) setFlagEx(true)

                        setArticles(sortedContent);
                    } else { console.error('Failed to send message for articles'); }

                } catch (error) { console.error('Error reloading the page for articles:', error); }

            } else { console.error('Failed to send message for lesson details'); }
        } catch (error) { console.error('Error sending message:', error); }
        setIsLoading(false);
    }, [itmID]); // fetchData dipende da itmID
 
    useEffect(() => {
        if (itmID) {
            setIsLoading(true);
            loadDataIfPossible()
        }
    }, [itmID, fetchData]);


    const loadDataIfPossible = async () => {
       

        try {
            let id_U = await getCookie('idUser');

            const json = JSON.stringify({
                "UserID": id_U,
                "idLesson": itmID
            });
            console.log("popopopopopopopopoopopopopopopo pre RESP: ", json);
            const response = await axios.post('/api/GetUsers_progress_on_lesson', json, { headers: { 'Content-Type': 'application/json', }, });
            console.log("popopopopopopopopoopopopopopopo RESP: ", response);
            console.log("popopopopopopopopoopopopopopopo RESP_2: ", response.data.users_progress_on_lesson[0][0]);
            console.log("popopopopopopopopoopopopopopopo RESP_2: ", (response.data.users_progress_on_lesson[0][0] === undefined));
            
            

            if (response.data.users_progress_on_lesson[0][0] === undefined) {
                try {

                    const json = JSON.stringify({
                        "UserID": id_U,
                        "idLesson": itmID
                    });
                    console.log("popopopopopopopopoopopopopopopo 2: ", json);
                    const response = await axios.post('/api/CreateUsers_progress_on_lesson', json, { headers: { 'Content-Type': 'application/json', }, });
                    console.log("popopopopopopopopoopopopopopopo 3: ", response);


                    if (response.status == 200) {
                        fetchData();
                    } else if (response.status == 210) {
                        console.log("response.data.price ", response.data.price)
                        setBox4BuyLesson(response.data.price)
                    } else {
                        console.log("booooooooooooooooooooooooooo ", response.status);
                        
                    }

                } catch (error) { console.error('Error sending message CreateUsers_progress_on_lesson:', error); }

            } else if (response.status === 200 && response.data.users_progress_on_lesson[0][0].Complete === 1) {
                fetchData();
                setIsLessonCompleted(true);
            }  else if (response.status === 200) {
                fetchData();
            }

        } catch (error) { console.error('Error sending message GetUsers_progress_on_lesson:', error); }

    }


    const setBox4BuyLesson = async (prc: number) => {
        console.log("BuyLesson");
        setIsLoading(false)
        setBuyLessonFlag(true)
        setPrice(prc)
    }


    const buyLesson = async () => {
        

        try {
            let id_U = await getCookie('idUser');

            const json = JSON.stringify({
                "UserID": id_U,
                "Price": price,
                "idLesson": itmID
            });
            console.log("popopopopopopopopoopopopopopopo --2: ", json);
            const response = await axios.post('/api/BuyLesson', json, { headers: { 'Content-Type': 'application/json', }, });
            console.log("popopopopopopopopoopopopopopopo --3: ", response);


            if (response.status == 200) {
                
                setBuyLessonFlag(false)
                setIsLoading(true)
                setbuyErrorFlag(false)
                fetchData();
            } else if (response.status == 210) {
                // TODO: error message
                setbuyErrorFlag(true)
            }

        } catch (error) { console.error('Error buy lesson:', error); }
    }


    // Intersection Observer per otherLessonsRef
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Aggiorna lo stato `hasScrolledToOtherLessons` in base alla visibilità
                setHasScrolledToOtherLessons(entry.isIntersecting);
            },
            {
                root: null, // Il viewport del browser
                rootMargin: '0px',
                threshold: 0.1, // L'elemento è considerato visibile quando almeno il 10% è nel viewport
            }
        );

        if (otherLessonsRef.current) {
            observer.observe(otherLessonsRef.current);
        }

        return () => {
            if (otherLessonsRef.current) {
                observer.unobserve(otherLessonsRef.current);
            }
        };
    }, []); // Esegui solo al mount e unmount del componente


    // Effetto per calcolare se tutti gli esercizi sono stati completati
    useEffect(() => {
        console.log("COMPLETEEE");
        
        if (exsLength.length > 0) {
            const count = exsLength.reduce((accumulator, currentValue) => {
                return accumulator + (currentValue === 1 ? 1 : 0);
            }, 0);

            if (count === exNumb_MAX && exNumb_MAX > 0) { // Assicurati che ci siano esercizi da completare
                setFlagEx(true);
            } else if (exNumb_MAX === 0) { // Se non ci sono esercizi, considera gli esercizi completati
                setFlagEx(true);
            }
        }
    }, [exsLength, exNumb_MAX]);


    // Check if lesson is complete (rifattorizzata con useCallback e dipendenze)
    const updateLessonComplete = useCallback(async () => {
        let id_U = await getCookie('idUser');        

        try {
            console.log("1isPageType: ", isPageType, " hasScrolledToOtherLessons: ", hasScrolledToOtherLessons, " flagEx: ", flagEx);
            if (flagEx) {
                const json = JSON.stringify({
                    "UserID": id_U,
                    "idLesson": itmID
                });
                const response = await axios.post('/api/UpdateUsers_progress_on_lesson', json, { headers: { 'Content-Type': 'application/json', }, });
                console.log("Response update normal page: ", response.status);
                if (response.status === 200) { setIsLessonCompleted(true) }
            }
        } catch (error) { console.error('Error updating lesson progress:', error); }
    }, [isPageType, flagEx, hasScrolledToOtherLessons, SlidePageNumbFlag, itmID]);


    // Un useEffect che chiama updateLessonComplete quando le sue dipendenze cambiano
    useEffect(() => {
        if (!isLoading) { // Assicurati che i dati siano stati caricati prima di tentare l'aggiornamento
            updateLessonComplete();
        }
    }, [flagEx, hasScrolledToOtherLessons, SlidePageNumbFlag, isLoading, updateLessonComplete]); // Aggiungi isLoading e updateLessonComplete alle dipendenze


    return (
        <>
            <Link
                href={"/shop"}
                style={{
                    textDecoration: "none",
                    color: "black",
                }}
            >
                <Grid container direction="row" spacing={2}>
                    <KeyboardBackspaceIcon />
                    <Typography style={{ width: "100px" }}>Shop</Typography>
                </Grid>
            </Link>
            <Grid
                container // Usato Grid al posto di Grid2 per compatibilità
                direction="column"
                sx={{
                    justifyContent: "flex-start",
                    alignItems: "center",
                }}
                style={{ margin: "20px 0 50px 0" }}
            >
                <div style={{ textAlign: 'center', margin: '20px' }}>
                    <Typography variant="h2">{Title}</Typography>

                    {isImageLoading ? // Mostra il CircularProgress se l'immagine è in caricamento
                        <CircularProgress sx={{ display: 'block', margin: 'auto', mt: 2, mb: 2 }} />
                        : isPresent && dt ? // Se l'immagine è presente e l'URL non è nullo
                            <img 
                                src={dt} 
                                alt={`Lesson ${imgIDCover}`} // Aggiunto alt text per accessibilità
                                style={{height: 100, width: 350, margin: "5px 0 5px 20px", borderRadius: "10px", objectFit: 'cover'}} // Aggiunto objectFit
                            />
                            : // Altrimenti, mostra l'immagine di default (se non c'è immagine e non sta caricando)
                            <CardMedia
                                style={{height: 100, width: 310, margin: "5px 0 5px 20px", borderRadius: "10px"}}
                                image={process.env.NEXT_PUBLIC_DEFUALT_IMG_URL || '/default-lesson-image.png'} // Fallback se la variabile d'ambiente non è definita
                                title="Lesson image"
                            />
                    }
                </div>
                
                
                <Typography variant="subtitle1">{description}</Typography>
                <>
                    {isLessonCompleted ?
                        <Grid
                            container
                            direction="row"
                            sx={{
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Typography style={{ backgroundColor: "green", color: "white", padding: "15px 30px", borderRadius: "15px" }}>Lesson is completed</Typography>
                        </Grid>
                        :
                        null
                    }
                </>
                {isPageType === 0 ?
                    <>
                        {isLoading ? (
                            <CircularProgress />
                        ) :
                        buyLessonFlag ? 
                            <Card variant="outlined" style={{padding: "30px", borderRadius: "15px", backgroundColor: "#eee"}}>
                                <Grid2
                                    container
                                    direction="column"
                                    sx={{
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Typography>Buy lesson</Typography>
                                    <Typography>Price: {price}</Typography>
                                    <Button onClick={buyLesson}>BUY now</Button>
                                    {buyErrorFlag && (
                                        <Typography style={{backgroundColor: "red", padding: "10px", margin: "10px", borderRadius: "10px", color: "white"}}>
                                            ERROR !!! Not enough founds
                                        </Typography>
                                    )}
                                </Grid2>
                            </Card>
                        : (
                            articles.map((obj_to_disp: any, index: number) => (
                                obj_to_disp.Type === 0 ?
                                    <Textcanvas key={index} textToDisp={obj_to_disp.Content} Title={obj_to_disp.Title} />
                                    :
                                    obj_to_disp.Type === 1 ?
                                        <ImageDisp
                                            key={index}
                                            imgID={obj_to_disp.idIMGS}
                                        />
                                        :
                                        obj_to_disp.Type === 2 ?
                                            <ExerciseBox
                                                key={index}
                                                index={index}
                                                exerciseID={obj_to_disp.Exercise_Grp_ID}
                                                currentLessonID={0}
                                                currentPosition={0}
                                                reloadPage={() => { }}
                                                moveDirection={(direction: number, OBJ_Type: number) => { }}
                                                isOnLessonCreate={false}
                                                isLessonCompleted={isLessonCompleted}
                                                setAllExCompleted={setAllExCompletedManager}
                                            />
                                            : <>ERROR !!! --- RELOAD PAGE --- </>
                            ))
                        )}
                    </>
                    :
                    isPageType === 1 ?
                        <SliderComponent>
                            {isLoading ? (
                                <CircularProgress />
                            ) : (
                                articles.map((obj_to_disp: any, index: number) => (
                                    obj_to_disp.Type === 0 ?
                                        <Textcanvas key={index} textToDisp={obj_to_disp.Content} Title={obj_to_disp.Title} />
                                        :
                                        obj_to_disp.Type === 1 ?
                                            <ImageDisp
                                                key={index}
                                                imgID={obj_to_disp.idIMGS}
                                            />
                                            :
                                            obj_to_disp.Type === 2 ?
                                                <ExerciseBox
                                                    key={index}
                                                    index={index}
                                                    exerciseID={obj_to_disp.Exercise_Grp_ID}
                                                    currentLessonID={0}
                                                    currentPosition={0}
                                                    reloadPage={() => { }}
                                                    moveDirection={(direction: number, OBJ_Type: number) => { }}
                                                    isOnLessonCreate={false}
                                                    isLessonCompleted={isLessonCompleted}
                                                    setAllExCompleted={setAllExCompletedManager}
                                                />
                                                : <>ERROR !!! --- RELOAD PAGE --- </>
                                ))
                            )}
                        </SliderComponent>
                        :
                        null
                }
            </Grid>
            <>
                {isLessonCompleted ?
                    <Grid
                        container
                        direction="row"
                        sx={{
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Typography style={{ backgroundColor: "green", color: "white", padding: "15px 30px", borderRadius: "15px" }}>Lesson is completed</Typography>
                    </Grid>
                    :
                    null
                }
            </>
            <Grid> {/* Usato Grid al posto di Grid2 */}
                <Typography ref={otherLessonsRef} variant="h2" style={{ marginBottom: "20px" }}>
                    Other lessons:
                </Typography>
                <ProductShow currentLessonID={itmID} />
            </Grid>
            {/* DEBUG for scrolling  */}
            {/* <div style={{ position: 'fixed', bottom: '20px', right: '20px', padding: '10px', backgroundColor: 'lightgray', border: '1px solid black', zIndex: 1000 }}>
                <p>Scrollato a "Other lessons": {hasScrolledToOtherLessons ? 'Sì' : 'No'}</p>
                <p>ISLoading: {isLoading.toString()}</p>
                <p>Page type: {isPageType}</p>
                <p>flagEx: {flagEx.toString()}</p>
                <p>SlidePageNumbFlag: {SlidePageNumbFlag.toString()}</p>
            </div> */}
        </>
    );
}