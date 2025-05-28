"use client"

import * as React from 'react';
import { Card, CardContent, Grid, Grid2, Paper, styled, Typography } from '@mui/material';
import BedIcon from '@mui/icons-material/Bed';
import Link from 'next/link';
  
export default function NavigationCards(
    {title, link}:
    {
        title: string, 
        link: string
    }
) {
    return (
        <Link
            href={link}
            style={{
                textDecoration: "none",
                color: "black"
            }}
        >
            <Card variant="outlined" style={{minWidth: "100px"}}>
                <CardContent>
                    <Grid2
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Grid item xs={3}>
                            <BedIcon />
                        </Grid>
                        <Typography variant="h3" component="div">
                            {title}
                        </Typography>
                    </Grid2>
                    
                </CardContent>
            </Card>
        </Link>
    );
}