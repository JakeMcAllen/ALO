"use client"

import FeaturedProducts from "@/components/cards/FeaturedProducts";
import NavigationCards from "@/components/cards/NavigationCards";
import { ProductShow } from "@/components/Shop/ProductShow";
import { Box, Grid, Grid2, Paper, styled, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";


export default function Page() {

  const [category, setCategory] = useState<any[]>([]);
  
  const fetchData = async (pagSt: number) => {
 
    try {
        const response = await axios.get('/api/category', {
            headers: { 'Content-Type': 'application/json', },
        });
    
        if (response.status === 200) {
            console.log('Message sent successfully');
            // console.log(response.data.category);
            // console.log(response.data.category.length);
            

            setCategory(response.data.category.concat([{idcategory: response.data.category.length, Name: "Altro", Description: "..."}]))
                            
        } else { console.error('Failed to send message'); }
    } catch (error) { console.error('Error sending message:', error); }

  }

  useEffect(() => {
      fetchData(0)
  }, [])


    return (
      <>
        <Grid2
          container
          direction="column"
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography variant="h1">Carosello</Typography>
          </Box>
          <Grid2 
            container 
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {category.map((page: any, index: any) => (
              <div key={page.idcategory} style={{margin: "0 10px"}}>
                <NavigationCards title={page.Name} link={"/shop/" + page.Name}/>
              </div>
            ))}
          </Grid2>
        </Grid2>
        <Grid2
          container
          direction="column"
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box>
            <FeaturedProducts />
          </Box>
        </Grid2>
        <div
          style={{margin: "50px"}}
        >
          <Box>
            <Typography variant="h3" style={{marginBottom: "50px"}}>Prodotti:</Typography>
            <ProductShow />
          </Box>
        </div>
      </>
    )
}