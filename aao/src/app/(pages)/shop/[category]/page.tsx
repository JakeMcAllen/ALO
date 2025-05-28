"use client"

import { ProductShow } from "@/components/Shop/ProductShow"
import { Box, Grid2, Link, Typography } from "@mui/material"
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

export default async function Page({
    params,
  }: {
    params: Promise<{ category: string }>
  }) {
    
    const category = (await params).category

    // TODO: add a control system

    return (
        <div
          style={{margin: "20px"}}
        >
          <Grid2 container spacing={2}>
            <Link
              href={"/shop"}
              style={{
                textDecoration: "none",
                color: "black"
              }}
            >
              <KeyboardBackspaceIcon />
            </Link>
            <div>Categoria: {category}</div>
          </Grid2>
          <Box>
            <Typography variant="h3" style={{marginBottom: "50px"}}>Prodotti:</Typography>
            <ProductShow categoryName={category} />
          </Box>
        </div>
    )
  }