'use client'

import { Chip, Grid2, Typography } from "@mui/material"
import axios from "axios";
import { title } from "process";
import React, { useState } from "react";

export default function Textcanvas({
    Title = undefined,
    textToDisp,
  }: {
    Title?: string | undefined,
    textToDisp: string
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


    return (
        <Grid2
            container
            direction="column"
            sx={{
                justifyContent: "flex-start",
                alignItems: "center",
                backgroundColor: (theme) =>
                    theme.palette.mode === "light"
                    ? theme.palette.grey[200]
                    : theme.palette.grey[800],
                p: 6, 
                width: "100%",
                marginTop: "10px",
                borderRadius: "25px",
                padding: "1%"
            }}
        >
            <>
                {Title?
                    <Typography variant="subtitle2" style={{margin: "10px 0 30px 0"}}>{Title}</Typography>
                    :
                    null
                }
            </>
            <Grid2 
                container
                direction="row"
                sx={{
                    justifyContent: "center",
                    alignItems: "center",
                }}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
                <Grid2 
                    size={{ xs: 4, md: 6 }} 
                    sx={{height: "500px", width: "40%", overflow: "overlay", scrollbar: "none", padding: "5px"}}
                    
                >
                    {
                        textToDisp.split(".").map((ttd_splt: string, main_index: number) => (
                            <div key={main_index} style={{margin: "0 0 10px 0"}}> 
                                {
                                    ttd_splt.split(" ").map((elm: string, index: number) => (
                                        elm?
                                        <Chip 
                                            key={index}  
                                            variant="outlined" 
                                            onClick={() => handleClick(elm)}
                                            label={elm} 
                                            style={{
                                                padding: "1px 1px",
                                                borderColor: "#c8c8c8"
                                            }}
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
                </Grid2>
                <Grid2
                    container
                    sx={{
                            backgroundColor: "white",
                            borderRadius: "15px",
                            height: "45%",
                            width: "40%",
                            padding: "5%"
                    }}
                    size={{ xs: 4, md: 6 }} 
                >
                    <Grid2
                        size={12}
                        sx={{
                            backgroundColor: "white",
                            borderRadius: "15px",
                            p: 6,
                            height: "45%",
                            padding: "0"
                        }}
                    >
                        <Grid2 container spacing={2}> <Typography variant="h4"> Word: </Typography> <Typography variant="h6">{wordSearched} </Typography> </Grid2>
                        <Typography variant="h6"> <b>Definition:</b> {definition} </Typography>
                        <Typography variant="h6"> <b>Examples:</b> {Examples} </Typography>
                        <Typography variant="h6"> <b>Synset:</b> {Synset} </Typography>
                    </Grid2>

                </Grid2>
            </Grid2>
            <Grid2
                size={12}
                sx={{
                    backgroundColor: "white",
                    borderRadius: "15px",
                    p: 6,
                    height: "45%",
                    width: "100%",
                    padding: "1%"
                }}
            >
                <Typography>Action box, condividi, coppia, ecc..</Typography>
            </Grid2>
        </Grid2>
    )
}





                            