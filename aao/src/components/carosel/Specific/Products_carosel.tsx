"use client"

import React, { useEffect, useState } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from '../extra/EmblaCarouselArrowButtons'
import {
  SelectedSnapDisplay,
  useSelectedSnapDisplay
} from '../extra/EmblaCarouselSelectedSnapDisplay'
import useEmblaCarousel from 'embla-carousel-react'

import "./../css/embla_product.css"
import axios from 'axios'
import ProductCard from '@/components/cards/LessonCard'
import { Grid2 } from '@mui/material'

type PropType = {
    pag?: number
    Lesson4PageSet?: number,
    categoryName?: string | undefined
}


const Products_carosel: React.FC<PropType> = (props) => {
    const [ids, setIDS] = useState<number[]>([]);
    const { pag = 0, Lesson4PageSet, categoryName = undefined } = props


    const fetchData = async () => {

        try {
            const json = JSON.stringify({ pag: pag, "category": categoryName, lesson4Page: Lesson4PageSet });
            const response = await axios.post('/api/lessonIDList', json, {
                headers: { 'Content-Type': 'application/json', },
            });
        
            if (response.status === 200) {
                // console.log(response.data.lessonIDList);
                
                setIDS(ids.concat(response.data.lessonIDList))
                
            } else { console.error('Failed to send message'); }
        } catch (error) { console.error('Error sending message:', error); }

    }

    
    
    const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start' })
    
    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi)

    let { selectedSnap, snapCount } = useSelectedSnapDisplay(emblaApi)

    useEffect(() => {
        fetchData()
    }, [])



    return (
        <section className="embla_v1">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {ids.map((id: any, index: number) => (
                        <Grid2 className="embla__slide"  key={index} size={{ xs: 2, sm: 4, md: 4 }}>
                            <ProductCard idF={id.idLesson} /> 
                        </Grid2>
                    ))}
                </div>
            </div>

            <div className="embla__controls">
                <div className="embla__buttons">
                    <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                    <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
                </div>

                <SelectedSnapDisplay
                    selectedSnap={selectedSnap}
                    snapCount={snapCount}
                />
            </div>
        </section>
    )

}

export default Products_carosel;
