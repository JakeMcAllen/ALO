"use client"

import { Button, Card, CardActions, CardContent, CardMedia, CircularProgress, Grid2, Paper, styled, Typography } from "@mui/material"
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import BigButton from "../Button/BigButton";
import { fetchData_forLesson } from "./fetchData/fd_4Product";

export default function LessonCard({idF}:{idF: number} ) {

    const [id, setID] = useState<number>(0);
    const [name, setName] = useState<String>("");
    const [price, setPrice] = useState<number>(-1);
    const [description, setDescription] = useState<String>("");
    
    // Img loading variables
    const [dt, setDT] = useState<string>();
    const [isPresent, setIsPresent] = useState<Boolean>(false);
    const [isLoading, setIsLoading] = useState<Boolean>(false);


    useEffect(() => {
        
        fetchData_forLesson(setIsLoading, setIsPresent, idF, setID, setName, setPrice, setDescription, setDT)

    }, [])


    return (
        <Card sx={{ maxWidth: 345 }}>
            <Link href={"/Lesson/" + id }>
                {isPresent? 
                    <img 
                        src={dt} 
                        style={{height: 100, width: 310, margin: "5px 0 5px 20px", borderRadius: "10px"}}
                    />
                    :
                    <>
                        {isLoading ? 
                            <CircularProgress />
                            :
                            <CardMedia
                                style={{height: 100, width: 310, margin: "5px 0 5px 20px", borderRadius: "10px"}}
                                image={process.env.NEXT_PUBLIC_DEFUALT_IMG_URL}
                                title="green iguana"
                            />
                        }
                    </>
                }
            </Link>
            <Grid2
                container
                direction="row"
                sx={{
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
            >
                {/* <div>{idF}</div> */}
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {description}
                    </Typography>
                </CardContent>
                <Typography 
                    style={{marginRight: "20px"}}
                >
                    {price} €
                </Typography>
            </Grid2>
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