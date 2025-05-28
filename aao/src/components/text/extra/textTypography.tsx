'use client'

import { Chip, Grid2, Typography } from "@mui/material"

export function TextTypography ({
    mainTitle,
    content
  }: {
    mainTitle: string
    content: string | string[]
  }) 
{

    return (
        <Grid2 container spacing={2}> 
            <Typography variant="h4"> {mainTitle}: </Typography> 
                <Typography variant="h6">{content} </Typography> 
        </Grid2>
    )
}