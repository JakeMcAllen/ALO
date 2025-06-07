"use client"

import { Box, Button, Grid, Grid2, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";


const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/gif"];
const MAX_FILE_SIZE_MB = 5;


export default function UploadImage() {

    const [selectedFile, setSelectedFile] = useState<any>(null);
    const [error, setError] = useState<any>(null);
    const [idFurniture, setIdFurniture] = useState<number>(0);


    const [TitleVal, setTitleVal] = useState<String>("");
    const [priceVal, setpriceVal] = useState<Number>(0);
    const [DescriptionVal, setDescriptionVal] = useState<String>("");
    const [CategoryID, setCategoryID] = useState<Number>(0);

    

    const handleUpload = () => {
        
        fetchData()
        
    }


    const valueInput = (e: any) => { setIdFurniture(e.target.value); }


    const fetchData = async () => {
        try {
            // const json = JSON.stringify({ "fotmitureID": file });

            const formatData = new FormData();
            // formatData.append('file', file);
            formatData.append("Name", TitleVal.toString());
            formatData.append("Price", priceVal.toString());
            formatData.append("Description", DescriptionVal.toString());
            formatData.append("CategoryID", CategoryID.toString());



            const response = await axios.post('/api/addFurniture', formatData, { headers: { 'Content-Type': 'multipart/form-data' }, });
        
            if (response.status === 200) {
                console.log('Message furniture: response');
                console.log(response);
                
                // let fnt = response.data.furniture[0][0]

                // setID(fnt.furnitureID)
                // console.log("fnt.furnitureID");
                // console.log(fnt.furnitureID);
                
                // setName(fnt.Name)
                // setPrice(fnt.Price)
                // setDescription(fnt.Description)
            } else { console.error('Failed to send message'); }
        } catch (error) { console.error('Error sending message:', error); }
    }





    const handleFileChange = (event: any) => {
        const file = event.target.files[0];

        // File type validation
        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
            setError("Invalid file type. Please upload a JPEG, PNG, or GIF image.");
            return;
        }

        // File size validation
        if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
            setError(`File size exceeds ${MAX_FILE_SIZE_MB} MB. Please choose a smaller file.`);
            return;
        }

        setSelectedFile(file);
        setError(null);
    };

    const handleUploadImg = () => {
        if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);

        console.log("Uploading file...", formData);
        } else {
        console.error("No file selected");
        }
    };






    return (
        <>
            <Typography variant="h4"> Upload Img </Typography>
            <Box p={3} border="1px dashed #ccc" borderRadius={8} textAlign="center">                
                <Grid
                    container
                    direction="column"
                    sx={{
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <TextField value={TitleVal} onChange={(e) => {setTitleVal(e.target.value)}} fullWidth label="Title" id="fullWidth" sx={{ width: 500, maxWidth: '100%' }} />
                    <TextField value={priceVal} onChange={(e) => {setpriceVal(Number(e.target.value))}} type="number" fullWidth label="Price" id="fullWidth" sx={{ width: 500, maxWidth: '100%' }} />
                    <TextField value={DescriptionVal} onChange={(e) => {setDescriptionVal(e.target.value)}} fullWidth label="Description" id="fullWidth" sx={{ width: 500, maxWidth: '100%' }} />
                    <TextField value={CategoryID} onChange={(e) => {setCategoryID(Number(e.target.value))}} type="number" fullWidth label="Price" id="fullWidth" sx={{ width: 500, maxWidth: '100%' }} />

                </Grid>
            </Box>
        </>
    )
}