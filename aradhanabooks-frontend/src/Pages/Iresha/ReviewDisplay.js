import {Box} from "@mui/material"
import HomeHead from "../../Components/Sasin/HomeHead.js"
import HomeFoot from "../../Components/Sasin/HomeFoot.js"
import DisplayReviews from "../../Components/Iresha/DisplayReviews.js"

const ReviewDisplay= () => {
    return(
        <div>
            <Box>
                <HomeHead/>
                <br/><br/><br/><br/><br/>
                <DisplayReviews/>
                <br/>
                
                <HomeFoot/>
            </Box>
        </div>
    )
}
export default ReviewDisplay;