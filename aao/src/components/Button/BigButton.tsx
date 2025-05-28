"use client"


import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { Typography } from '@mui/material';


  
export default function BigButton({text="No text", path=undefined, textColor="#ffffff", background_clr=0}: 
    {
        text: string
        path?: string | undefined,
        textColor?: string,          // #000000
        background_clr?: Number               // #FF5733
    }
) {

      
  
    
  return (
    <>
        {path == undefined ?
            <Button 
                size="small" 
                color="secondary"
            >
                <Typography 
                    style={{color: textColor, fontWeight: "bold"}}
                >
                    {text}
                </Typography>
            </Button>
        :
            <Button
                variant="contained" 

            >
                <Link
                    href={path}
                    style={{
                        textDecoration: "none",
                        color: textColor,
                        fontWeight: "bold"
                    }}
                >
                    {text}
                </Link>
            </Button>
        }    
    </>
  );
}
