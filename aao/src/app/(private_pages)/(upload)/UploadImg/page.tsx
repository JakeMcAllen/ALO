"use client"

import { Box, Button, Checkbox, Grid, Grid2, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";


const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/gif"];
const MAX_FILE_SIZE_MB = 5;


export default function UploadImage() {

    const [selectedFile, setSelectedFile] = useState<any>(null);
    const [error, setError] = useState<any>(null);
    const [idFurniture, setIdFurniture] = useState<number>(0);
    const [description, setDescription] = useState<string>("");

    const [isMainIng, setIsMainIng] = useState<Boolean>(false)
    const [isHotel, setIsHotel] = useState<Boolean>(false)


    const handleUpload = () => {
        
        fetchData()
        
    }


    const valueInput = (e: any) => { setIdFurniture(e.target.value); }
    const descriptionInput = (e: any) => { setDescription(e.target.value); }

    const fetchData = async () => {
        try {
            // const json = JSON.stringify({ "fotmitureID": file });

            const formatData = new FormData();
            // formatData.append('file', file);
            formatData.append("file", selectedFile);
            formatData.append("idFurniture", idFurniture.toString());
            formatData.append("description", description.toString());
            formatData.append("isMainIng", isMainIng.toString());
            formatData.append("isHotel", isHotel.toString());


            const response = await axios.post('/api/UploadImg', formatData, { headers: { 'Content-Type': 'multipart/form-data' }, });
        
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
                    <input
                        type="number"
                        id="quantity" 
                        name="Forniture's ID" min="1"
                        onChange={valueInput}
                    />
                    <TextField fullWidth label="Description" id="fullWidth" sx={{ width: 500, maxWidth: '100%' }} onChange={descriptionInput}/>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                        id="image-file-input"
                    />
                    <Grid2
                        container direction="row"
                        sx={{justifyContent: "center", alignItems: "center", }}
                    >
                        <Typography>Main imags ?</Typography>
                        <Checkbox value={isMainIng} onChange={(e) => {setIsMainIng(!isMainIng)}}/>
                    </Grid2>
                    <Grid2
                        container direction="row"
                        sx={{justifyContent: "center", alignItems: "center", }}
                    >
                        <Typography>Hotel ?</Typography>
                        <Checkbox value={isHotel} onChange={(e) => {setIsHotel(!isHotel)}}/>
                    </Grid2>
                    <label htmlFor="image-file-input">
                        <Button variant="outlined" component="span">
                        Select Image
                        </Button>
                    </label>
                    {selectedFile && (
                        <div>
                        <Typography variant="subtitle1" mt={2}>
                            Selected Image: {selectedFile.name}
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleUpload}
                            sx={{ mt: 2 }}
                        >
                            Upload
                        </Button>
                        </div>
                    )}
                    {error && (
                        <Typography variant="body2" color="error" mt={2}>
                        {error}
                        </Typography>
                    )}
                </Grid>
            </Box>
        </>
    )
}