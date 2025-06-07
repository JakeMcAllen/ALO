"use client"

import React from "react";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { Button, createTheme, Grid2, TextField } from "@mui/material";


export default function NumericInput({min, max, currentValue} :
    {
        min: number, 
        max: number,
        currentValue: number
    }
) {

  const [numVal, setValue] = React.useState<number>(currentValue);

    function handleValueChange(changeValueQuantity: number) {
        let nv: number = numVal + changeValueQuantity

        if ( nv >= min && nv <= max ) {
            setValue(nv)
            console.log(nv);
            
        }
    }


    return (
        <Grid2 container spacing={0}>
            <Button 
                onClick={() => handleValueChange(-1)}
                style={{margin: "0px"}}
            ><RemoveIcon /></Button>
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