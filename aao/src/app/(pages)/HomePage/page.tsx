// import styles from "./page.module.css"; //  className={styles.page}

import EmblaCarousel from "@/components/carosel/EmblaCarousel";
import Products_carosel from "@/components/carosel/Specific/Products_carosel";
import Textcanvas from "@/components/text/Textcanvas";
import { Grid2, Typography } from "@mui/material";

import { EmblaOptionsType } from 'embla-carousel'


export default function HomePage() {

    
    const OPTIONS: EmblaOptionsType = { align: 'start' }
    const SLIDE_COUNT = 11
    const SLIDES = Array.from(Array(SLIDE_COUNT).keys())


    return (
      <div>
        <Typography variant="h2">Benvenuto in Allena Arredamenti Online:</Typography>
        <Grid2
          container
          direction="row"
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >          
          <img 
            style={{width: "750px", height: "500px"}}
            src="https://holderimg.com/api/v1/Architecture"
          />
          <Typography variant="h6">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Typography>
        </Grid2>
        <Products_carosel Lesson4PageSet={10} />
      </div>
    );
  }
  