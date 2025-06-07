"use client"

import CartCard from "@/components/cards/CartCard";
import { NumberInput } from "@mui/base/Unstable_NumberInput/NumberInput";
import { Button, Grid, List, Typography } from "@mui/material"
import axios from "axios";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";

export default function Page() {

    const [cartList, setCartList] = useState<any[]>([]);

    const fetchData = async (pagSt: number) => {

        try {
            let idUser = await getCookie('idUser');
            if (idUser == undefined) { console.error('Failed to get id user'); throw Error("No user id"); }

            const json = JSON.stringify({UserID: idUser});
            const response = await axios.post('/api/getcartIdsListByID', json, {
                headers: { 'Content-Type': 'application/json', },
            });

            if (response.status === 200) {
                console.log('Message sent successfully');
                console.log(response);
                console.log(response.data.cartIDList);
                
                setCartList(response.data.cartIDList)
                                
            } else { console.error('Failed to send message'); }
        } catch (error) { console.error('Error sending message:', error); }
    
    }

    useEffect(() => {
        fetchData(0)
    }, [])



    return (
        <>
            <Typography variant="h1">Cart</Typography>
            <div style={{ backgroundColor: 'background.paper' }}>
                {cartList.map((page: any, index: any) => (
                    <div key={page.Furniture_furnitureID} style={{margin: "0 10px"}}>
                        <CartCard 
                            articleID={page.Furniture_furnitureID} 
                            Quantity={page.Quantity}  
                            isLast={index == (cartList.length -1)}
                        />
                    </div>
                ))}    
            </div>
            <Grid
                container
                direction="row"
                sx={{
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Button style={{width: "30%", backgroundColor: "green", margin: "20px"}}  variant="contained">
                    Buy all
                </Button>
            </Grid>
        </>
    )
}