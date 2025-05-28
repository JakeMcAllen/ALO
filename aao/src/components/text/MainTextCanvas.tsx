'use client'

import { BottomNavigation, BottomNavigationAction, Chip, Grid2, Paper, Typography } from "@mui/material"
import axios from "axios";
import React, { useState } from "react";

import { Article_interface } from "./extra/Article_interface";


export default function MainTextcanvas({
    articleToDisplay,
  }: {
    articleToDisplay: Article_interface[]
  }) 
{

    const [wordSearched, setWordSearched] = useState<string>("");
    const [definition, setDefinition] = useState<string>("");
    const [Examples, setExamples] = useState<string[]>([]);
    const [Synset, setSynset] = useState<string[]>([]);



    async function handleClick (wordToIspect: string) {
        setWordSearched(wordToIspect)

        const json = JSON.stringify({
            SearchWord: wordToIspect
        });


        const response : any = await axios.post('http://localhost:8080/WordDict', json, {
            headers: { 'Content-Type': 'application/json' },
        }); 
        
        
        if (response.data?.responde?.Definition?.length) {
            
            setDefinition(response.data.responde.Definition[0])
            setExamples(response.data.responde.Example[0])
            setSynset(response.data.responde.Synset[0])
        } else { console.error("Definition è undefined o vuoto!"); setDefinition(""); }

        
        
    }


    // TODO: to delete
    const [value, setValue] = React.useState(0);



    return (

        <Grid2 container spacing={2}
            sx={{
                backgroundColor: (theme) =>
                theme.palette.mode === "light"
                    ? theme.palette.grey[200]
                    : theme.palette.grey[800],
                p: 6, 
                width: "100%"
            }}
        >
            <Grid2 size={{ xs: 6, md: 8 }} sx={{height: "500px", width: "auto", overflow: "overlay", scrollbar: "none", padding: "5px"}}>
                {
                    articleToDisplay.map((textToDisp: any, mm_index: number) => (
                        <div key={mm_index}>
                            {
                                textToDisp.Content.split(".").map((ttd_splt: string, main_index: number) => (
                                    <div key={main_index} style={{margin: "0 0 10px 0"}}> 
                                        {
                                            ttd_splt.split(" ").map((elm: string, index: number) => (
                                                elm?
                                                <Chip 
                                                    key={index}  
                                                    variant="outlined" 
                                                    onClick={() => handleClick(elm)}
                                                    label={elm} 
                                                />
                                                :
                                                    null
                                            ))
                                        }
                                        .
                                        <br/>
                                    </div>

                                ))
                            }
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                        </div>   
                    ))
                }
            </Grid2>
            <Grid2 size={{ xs: 6, md: 4 }}
                sx={{
                    backgroundColor: "white",
                    borderRadius: "15px",
                    p: 6
                }}
            >
                <Grid2 container spacing={2}> <Typography variant="h4"> Word: </Typography> <Typography variant="h6">{wordSearched} </Typography> </Grid2>
                <Typography variant="h6"> <b>Definition:</b> {definition} </Typography>
                <Typography variant="h6"> <b>Examples:</b> {Examples} </Typography>
                <Typography variant="h6"> <b>Synset:</b> {Synset} </Typography>
            </Grid2>
        </Grid2>
    )
}