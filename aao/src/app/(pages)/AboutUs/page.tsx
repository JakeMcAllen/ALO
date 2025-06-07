"use client"

import { Grid, Grid2, Paper, styled, Typography } from "@mui/material"

export default function Page() {
  return (
    <>
      <Typography variant="h4" style={{marginLeft: "10px"}}>Benvenuto in Allena Arredamenti Online</Typography>
      <Grid2 container spacing={2} sx={{padding: "20px"}}>
        <Grid2 size={8}>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel diam dapibus erat dignissim fermentum. Donec sollicitudin nibh non velit tristique, sit amet faucibus ante volutpat. Integer varius velit scelerisque tellus luctus, eget efficitur odio semper. Integer facilisis vehicula turpis non rhoncus. Pellentesque eleifend faucibus diam, non eleifend ante vulputate mattis. Vivamus malesuada pulvinar lectus at tincidunt. Proin in varius metus. Nulla a commodo turpis. Sed lacinia est et ex tincidunt auctor. Proin vestibulum libero tellus, quis lobortis enim volutpat quis. Etiam et lorem commodo, imperdiet felis eu, congue libero. Duis dapibus purus eget sapien semper vestibulum. Nullam hendrerit sed dolor dictum rutrum. Nulla in semper lectus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Curabitur at auctor ante. Phasellus nec magna vitae enim vulputate dictum. Donec bibendum nibh quis tellus facilisis gravida. In et sodales nunc. Nam sagittis ac metus in accumsan. Donec at auctor diam, id blandit nisl. Donec rhoncus quam eu leo lobortis, eu sollicitudin felis hendrerit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras ornare erat et erat scelerisque suscipit. Sed imperdiet ultrices leo, et viverra nunc laoreet sed. Maecenas orci erat, cursus sed massa ac, volutpat pulvinar est. Donec nec semper justo. Praesent cursus purus massa, et elementum urna facilisis non. Praesent sit amet dui condimentum, elementum massa id, elementum magna. Sed eu aliquam sem, ac ullamcorper ipsum. Donec sed eleifend est. Phasellus ultrices rhoncus sem, in placerat mi rutrum ac. Cras finibus dui dui.</p>
        </Grid2>
        <Grid2 size={4}>
          <img
            style={{ width: 400, height: 400 }}
            srcSet={`https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format`}
            alt={"IMG da cambiare"}
            loading="lazy"
          />
        </Grid2>
        <Grid container direction="row" sx={{justifyContent: "center", alignItems: "center", }}>
          <img
            style={{ width: 200, height: 200, padding: "0 5px 0 5px" }}
            srcSet={`https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format`}
            alt={"IMG da cambiare"}
            loading="lazy"
          />
          <img
            style={{ width: 200, height: 200, padding: "0 5px 0 5px" }}
            srcSet={`https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format`}
            alt={"IMG da cambiare"}
            loading="lazy"
          />
          <img
            style={{ width: 200, height: 200, padding: "0 5px 0 5px" }}
            srcSet={`https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format`}
            alt={"IMG da cambiare"}
            loading="lazy"
          />
        </Grid>
      </Grid2>
    </>
  )
}


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));