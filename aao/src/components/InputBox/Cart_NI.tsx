"use client"

import React, { useEffect, useState } from "react";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { Button, createTheme, Grid2, TextField } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios from "axios";
import { getCookie } from "cookies-next";


export default function Cart_NI({min, max, currentValue, furnitureID} :
    {
        min: number, 
        max: number,
        currentValue: number, 
        furnitureID: number
    }
) {

    const [numVal, setValue] = useState<number>(currentValue);
    const [addButton_isDisabled, setAddButton_isDisabled] = useState<boolean>(false)
    

    // TODO: to add
    const [logStatus, setLogStatus] = useState<string>("");
    const [iDValue, setiDValue] = useState<number>(-1);




    const fetchUserID = async () => {
        let value = await getCookie('idUser');

        if (value) setiDValue(Number( value ))
        else { 
            setLogStatus('User not logged');
            // TODO: To test
            throw Error("User not logged")
        }
    }
    
    useEffect(() => {
        fetchUserID()
      }, [])
    




    async function handleValueChange(changeValueQuantity: number) {
        let nv: number = numVal + changeValueQuantity

        try {
            if (iDValue == -1) fetchUserID()


            if (nv <= 0) {
                console.log("Remove event");

                const json = JSON.stringify({
                    "UserID": iDValue,
                    "FornitureID": furnitureID
                });
                const response = await axios.post('/api/modiftyCartNumber', json, {
                    headers: { 'Content-Type': 'application/json' },
                });

                if (response.status === 200) { setLogStatus('success'); } 
                else { setLogStatus('fail'); }

            } else if ( nv >= min && nv <= max ) {
                // Modify cart item number
                setValue(nv)
                console.log(nv);

                const json = JSON.stringify({
                    "UserID": iDValue,
                    "FornitureID": furnitureID,
                    "Quantity": changeValueQuantity
                });
                const response = await axios.post('/api/modiftyCartNumber', json, {
                    headers: { 'Content-Type': 'application/json' },
                });

                if (response.status === 200) { setLogStatus('success'); } 
                else { setLogStatus('fail'); }
            }

            // Disable add button 
            if (nv >= max) setAddButton_isDisabled(true); else setAddButton_isDisabled(false);

        } catch (e) { console.log(e); }
    }


    return (
        <Grid2 container spacing={0}>
            <Button 
                onClick={() => handleValueChange(-1)}
                style={{margin: "0px"}}
                
            >{ numVal == 1 ?
                <DeleteForeverIcon />
                :
                <RemoveIcon />
            }</Button>
            <TextField
                id="filled-number"
                type="text"
                value={numVal}
                slotProps={{
                    inputLabel: {
                        shrink: false,
                    },
                }}
                style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "10px"
                }}
                variant="outlined" color="secondary" 
            /> 
            <Button 
              disabled={addButton_isDisabled}
              onClick={() => handleValueChange(1)}
              style={{margin: "0px"}}
            ><AddIcon /></Button>
        </Grid2>
    )

}





const theme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            // Outlined
            "& .MuiOutlinedInput-root": {
              color: "#000",
              fontFamily: "Arial",
              fontWeight: "bold",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#2e2e2e",
                borderWidth: "2px",
              },
              "&.Mui-focused": {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "secondary.main",
                  borderWidth: "3px",
                },
              },
              "&:hover:not(.Mui-focused)": {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ccc",
                },
              },
            },
            "& .MuiInputLabel-outlined": {
              color: "#2e2e2e",
              fontWeight: "bold",
              "&.Mui-focused": {
                color: "secondary.main",
              },
            },
            // Filled
            "& .MuiFilledInput-root": {
              color: "#000",
              fontFamily: "Arial",
              fontWeight: "bold",
              backgroundColor: "#e7e7e7",
              borderTopLeftRadius: "7px",
              borderTopRightRadius: "7px",
              "&:before": {
                borderColor: "#2e2e2e",
                borderWidth: "2px",
              },
              "&:after": {
                borderColor: "secondary.main",
                borderWidth: "3px",
              },
              ":hover:not(.Mui-focused)": {
                "&:before": {
                  borderColor: "#e7e7e7",
                  borderWidth: "2px",
                },
                backgroundColor: "#f4f4f4",
              },
            },
            "& .MuiInputLabel-filled": {
              color: "#2e2e2e",
              fontWeight: "bold",
              "&.Mui-focused": {
                color: "secondary.main",
              },
            },
            // Standard
            "& .MuiInput-root": {
              color: "#000",
              fontFamily: "Arial",
              fontWeight: "bold",
              "&:before": {
                borderColor: "#2e2e2e",
                borderWidth: "2px",
              },
              "&:after": {
                borderColor: "secondary.main",
                borderWidth: "3px",
              },
              ":hover:not(.Mui-focused)": {
                "&:before": {
                  borderColor: "#e7e7e7",
                  borderWidth: "2px",
                },
              },
            },
          },
        },
      },
    },
  });