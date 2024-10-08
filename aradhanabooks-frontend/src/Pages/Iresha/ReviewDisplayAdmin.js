import {Box} from "@mui/material"
import AdminHead from "../../Components/Sasin/AdminHead.js"
import AdminFoot from "../../Components/Sasin/AdminFoot.js"
import AdminViewReview from "../../Components/Iresha/AdminViewReview.js"

const ReviewDisplayAdmin= () => {
    return(
        <div>
            <Box>
                <AdminHead/>
                <br/><br/>
                <AdminViewReview/>
                <br/>
                
                <AdminFoot/>
            </Box>
        </div>
    )
}
export default ReviewDisplayAdmin;



