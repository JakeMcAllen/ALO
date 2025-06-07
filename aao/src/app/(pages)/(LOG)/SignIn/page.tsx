"use client"

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Alert, Container } from "@mui/material";
import axios from "axios";
import CheckIcon from '@mui/icons-material/Check';
import { useState } from "react";
import { setCookie } from "cookies-next";


// TODO: change expiration time to cookies
export default function SignInSide() {

  const [logStatus, setLogStatus] = useState<string>("");

  

  const handleSubmit = async (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      const json = JSON.stringify({ E_Mail: data.get("email"), Password: data.get("password"), });
      const response = await axios.post('/api/LogIn', json, {
          headers: { 'Content-Type': 'application/json', },
      });
  
      if (response.status === 200) {
        console.log("Login");
        console.log(response);

        setCookie("idUser", response.data.userID, {maxAge: (60 * 60 * 10)})
        setCookie("token", response.data.token, {maxAge: (60 * 60 * 10)})
        setCookie("Name", response.data.Name, {maxAge: (60 * 60 * 10)})

        setLogStatus("success")
      } else { console.error('Failed to send message'); setLogStatus("fail") }

   } catch (error) { console.error('Error sending message:', error); setLogStatus("fail") }

  };


  
  return (
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          marginTop: 8,
        }}
      >
        <Grid container>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: "url(https://holderimg.com/api/v1/Architecture)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/Register" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
                <>
                  {logStatus == "" ? 
                    <></>
                    :
                    <>
                      {logStatus == "success" ?
                        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                          Hai effettuato con successo il login
                        </Alert>
                        :
                        <Alert severity="error">Qualcosa è andato storto. Controlla i dati e poi riprova</Alert>
                      }
                    </>
                  }
                </>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}