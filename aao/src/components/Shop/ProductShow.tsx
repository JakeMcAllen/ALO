"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import LessonCard from "../cards/LessonCard";
import { Box, Grid2, Paper, styled } from "@mui/material";
import Button from '@mui/material/Button';


/**
 * 
 * @param param0 categoryID identify the current category. If undefined all category
 * @returns 
 */
export function ProductShow({categoryName} : {categoryName?: string | undefined}) {

    const [ids, setIDS] = useState<number[]>([]);
    const [pag, setPag] = useState<number>(0);


    const [pagMax, setPagMax] = useState<number[]>([]);



    // const [numbers, setNumbers] = useState(() => {
    //     const newNumbers = [];
    //     for (let i = 1; i <= pagMax; i++) { newNumbers.push(i); }
    //     return newNumbers;
    // });
    
    

    const fd_loop = (max_vals: number) => {
        const newNumbers = [];
        for (let i = 0; i <= max_vals; i++) { newNumbers.push(i); }
        return newNumbers
    }

    

    const fetchData = async (pagSt: number) => {

        // Get number of ids
        // TODO: categoryName test
        if (categoryName) {
            try {
                const json1 = JSON.stringify({ "category": categoryName, "onlyIDs": true, pag: pagSt == 0 ? 0 : pag, lesson4Page: 9 });
                const response1 = await axios.post('/api/lessonByCategory', json1, {
                    headers: { 'Content-Type': 'application/json', },
                });
            
                if (response1.status === 200) {
                    // TODO: To check
                    console.log(response1.data.lessonIDList);
                    
                    setIDS(ids.concat(response1.data.lessonIDList))
                    setPagMax(fd_loop(response1.data.pags))

                    setPag(pag  +1)
                } else { console.error('Failed to send message'); }
            } catch (error) { console.error('Error sending message 1:', error); }

        } else {

            try {
                const json = JSON.stringify({ pag: pagSt == 0 ? 0 : pag, lesson4Page: 9 });
                const response = await axios.post('/api/lessonIDList', json, {
                    headers: { 'Content-Type': 'application/json', },
                });
            
                if (response.status === 200) {
                    // console.log(response.data.lessonIDList);

                    setIDS(ids.concat(response.data.lessonIDList))
                    setPagMax(fd_loop(response.data.pags))
                    setPag(pag +1)                                
                } else { console.error('Failed to send message'); }
            } catch (error) { console.error('Error sending message:', error); }

        }

    }

    useEffect(() => {
        fetchData(0)
    }, [])
    


    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid2 container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {ids.map((id: any, index: number) => (
                    <Grid2 key={index} size={{ xs: 2, sm: 4, md: 4 }}>
                        <LessonCard idF={id.idLesson} /> 
                    </Grid2>
                ))}
            </Grid2>
            <Grid2
                container
                direction="column"
                sx={{
                    justifyContent: "center",
                    alignItems: "center",
                }}
                style={{marginTop: "80px"}}
            >
                <Button 
                    variant="text" 
                    onClick={() => {fetchData(pag)}}
                >
                    {pagMax.map((number: number) => (
                        number == (pag) ?
                            <li key={number}>Load more</li> 
                            : null
                    ))}
                </Button>
            </Grid2>
        </Box>
    )
}