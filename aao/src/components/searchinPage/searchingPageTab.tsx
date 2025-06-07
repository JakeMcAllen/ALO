import { Grid2 } from "@mui/material";
import ProductCard from "../cards/LessonCard";

export default function SearchingPageTab({category} : 
    {category?: any}
) {

    return (
        <Grid2 container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} style={{margin: "20px"}}>
            {category.map((page: any, index: any) => (
                <Grid2 key={index} size={{ xs: 2, sm: 4, md: 4 }}>
                    <ProductCard idF={page.idLesson} />
                </Grid2>
            ))}
        </Grid2>
    )
}