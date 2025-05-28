"use client"

import * as React from 'react';
import { Box, Button, Card, CardActions, CardContent, Grid, Grid2, Paper, styled, Typography } from '@mui/material';
import BedIcon from '@mui/icons-material/Bed';
import Link from 'next/link';
import { Description } from '@mui/icons-material';

export default function SearchCard( {title, link, description}:{title: string, link: string, description: string} ) {

    let descrpt = description.substring(0, 100)
    if (description.length > 100) descrpt = descrpt + " ..."


    return (
        <Link
            href={link}
            style={{
                textDecoration: "none",
                color: "black",
            }}
        >
            <Grid2 size={10} style={{width: "300px", margin: "10px"}}>
                <Card 
                    variant="outlined" sx={{ maxWidth: 275 }}
                >
                    <CardContent>
                        <Typography variant="h5" component="div">
                            {title}
                        </Typography>
                        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                            {descrpt}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid2>
        </Link>
    );
}