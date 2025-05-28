"use client"

import { Avatar, Box, Button, CardMedia, Divider, Grid, IconButton, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material"
import axios from "axios";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import NumericInput from "../InputBox/NumericInput";
import Cart_NI from "../InputBox/Cart_NI";
import Link from "next/link";


export default function CartCard({articleID, Quantity, isLast} : 
    {
        articleID: number, 
        Quantity: number,
        isLast: boolean
    }
) {

    const [id, setID] = useState<number>(0);
    const [name, setName] = useState<String>("");
    const [price, setPrice] = useState<number>(-1);
    // const [description, setDescription] = useState<String>("");
    const [dt, setDT] = useState<any []>();


    useEffect(() => {
        const fetchData = async () => {
            try {
                let json = JSON.stringify({ "idLesson": articleID });
                const response = await axios.post('/api/article', json, { headers: { 'Content-Type': 'application/json', }, });
                
                if (response.status === 200) {
                    console.log('Message furniture');
                    let fnt = response.data.furniture[0][0]

                    setID(fnt.furnitureID)
                    console.log("fnt.furnitureID");
                    console.log(fnt.furnitureID);
                    
                    setName(fnt.Name)
                    setPrice(fnt.Price)
                    // setDescription(fnt.Description)


                    // TODO: imgs to fix
                    // let json = JSON.stringify({ "idFurniture": articleID });
                    // const responseImg = await axios.post('/api/GetImg', json, { headers: { 'Content-Type': 'application/json', }, });
                
                    // console.log("popopopopopopopopopop");
                    

                    // if (responseImg.status === 200) {
                    //     console.log('Message Images');
                    //     console.log(responseImg);
                    //     console.log(responseImg.data.ImgBytes);
                        
                        
                    //     let fnt = responseImg.data.ImgBytes
    
                    //     console.log("op");
                    //     console.log(fnt);
                        
                        

                    //     setDT(fnt)
                    
                    // }


                } else { console.error('Failed to send message'); }
            } catch (error) { console.error('Error sending message:', error); }
        }
        fetchData()
    }, [])


    return(
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={3}>
                    <Grid item xs="auto">
                        <Link href={"/furniturePage/" + articleID }>
                            {dt? 
                                <CardMedia
                                    sx={{ height: 100, width: 100 }}
                                    style={{margin: "5px 0 5px 20px", borderRadius: "10px"}}
                                    image="https://holderimg.com/api/v1/Architecture"
                                    title="green iguana"
                                />
                                :
                                <img src={`data:image/jpeg;base64,${dt}`} />
                            }
                        </Link>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography
                            component="span"
                            variant="h5"
                            sx={{ color: 'text.primary', display: 'inline' }}
                        >
                            {name}
                        </Typography>
                        <Typography variant="subtitle1">Prezzo: {price}</Typography>
                    </Grid>
                    <Grid item xs style={{marginRight: "10px"}}>
                        <Grid
                            container
                            direction="row"
                            sx={{
                                justifyContent: "flex-end",
                                alignItems: "center",
                            }}
                        >
                            <Cart_NI min={0} max={10} currentValue={Quantity} furnitureID={articleID}/>
                        </Grid>
                    </Grid>
                </Grid>
                {isLast ? <></> : <Divider />}
            </Box>
        </>
    )

}