"use client"

import { Button, Card, CardContent, Grid, Grid2, Typography } from "@mui/material";
import BigButton from "../Button/BigButton";

export default function FeaturedProducts() {

    // TODO: LoadRandom page from goup for pubblicity !!!
    // TODO: Fix links ! 
    

    return (
        <div
            style={{margin: "20px 0"}}
        >
            <Typography variant="h3" style={{margin: "0 0 20px 0"}}>Prodotto in evidenza:</Typography>
            <Grid container spacing={2}>
                <img 
                    src="https://www.sediarreda.com/img/9db5013501/hires-masters-sedia-impilabile-di-design-realizzata-in-polipropilene.jpg" 
                    alt="Girl in a jacket" width="400px" height="400px" 
                    style={{borderRadius: "15px", margin: "0 50px 0 0"}}
                />
                <Card sx={{ minWidth: 275 }} style={{}}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom sx={{ color: 'text.secondary' }}>
                            Titolo prodotto
                        </Typography>
                        <Typography style={{maxWidth: "500px"}}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </Typography>
                        
                    </CardContent>
                    <CardContent>
                        <Grid2 container spacing={2}>
                            <BigButton
                                text="Espora"
                                path={"/Lesson/1" }
                            />
                            <BigButton
                                path={"/Lesson/1" }
                                text={"Vedi altro"}
                            />
                        </Grid2>
                    </CardContent>
                </Card>
            </Grid>
        </div>
    )

}