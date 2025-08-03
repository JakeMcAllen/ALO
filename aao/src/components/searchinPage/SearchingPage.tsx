"use client"

import { Grid2, TextField, Typography } from "@mui/material"
import axios from "axios";
import { useEffect, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import SearchingPageTab from "./searchingPageTab";


export default function SearchingPage({params=""} : 
    {params?: string}
) {

    const [category, setCategory] = useState<any[]>([]);
    const [hasValues, setHasValues] = useState<Boolean>(false);
    const [isLoading, setIsLoading] = useState<Boolean>(true)

    const [searchText, setSearchText] = useState<string>(params)


    
    const fetchData = async (inVal : string|undefined, apiTerm: string) => {

        setIsLoading(true)
        setCategory([])
        try {
            if (inVal == undefined) setSearchText(""); 
            else if (inVal != undefined) setSearchText(inVal); 


            const json = JSON.stringify({
                nameVal: inVal,
                descriptionVal: inVal
            });

            const response = await axios.post('/api/' + apiTerm, json, {
                headers: { 'Content-Type': 'application/json', },
            });
        
            if (response.status === 200) {

                if (apiTerm == "searchLesson") {
                    if (response.data.cartIDList.length == 0) { setHasValues(false) }
                    else {
                        console.log('Message sent successfully', response.data);
                        
                        console.log(response.data.cartIDList);
                        console.log(response.data.cartIDList.length);
                        
                        setHasValues(true)
                        setCategory(response.data.cartIDList)
                    }      

                } else {
                    if (response.data.us.length == 0) { setHasValues(false) }
                    else {
                        console.log('Message sent successfully', response.data);
                        
                        console.log(response.data.us);
                        console.log(response.data.us.length);
                        
                        setHasValues(true)
                        setCategory(response.data.us)
                    }      
                }

            } else { console.error('Failed to send message'); }
        } catch (error) { console.error('Error sending message:', error); }

        setIsLoading(false)
    }

    
    useEffect(() => { 
        fetchData(params, "searchLesson") 
        fetchData(params, "searchUser")
    }, [])


    return (
        <div>
            <Typography variant="h2" style={{marginLeft: "10px"}}>SearchPage</Typography>
            <div style={{margin: "10px 5% 10px 5%"}}>
                <TextField
                    required
                    id="outlined-required"
                    label="Search"
                    fullWidth 
                    defaultValue={params}
                    value={searchText}
                    onInput={(event: React.ChangeEvent<HTMLInputElement>) => {fetchData(event.target.value, "searchLesson"); fetchData(event.target.value, "searchUser");}}
                />
            </div>
            {hasValues? 
                <SearchingPageTab category={category} />
                :
                <>
                    {isLoading?
                        <CircularProgress />
                        :
                        <Typography variant="h2">No value</Typography>
                    }
                </>
            }
        </div>
    )

}