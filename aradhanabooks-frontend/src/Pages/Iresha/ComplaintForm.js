import {Box} from "@mui/material"
import HomeHead from "../../Components/Sasin/HomeHead.js"
import HomeFoot from "../../Components/Sasin/HomeFoot.js"
import AddComplaint from "../../Components/Iresha/AddComplaint.js"

const ComplaintForm = () => {
    return(
        <div>
            <Box>
            
            
                <HomeHead/>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/>
                <AddComplaint/>
                <br/><br/><br/><br/><br/><br/><br/>
                
                <HomeFoot/>
            </Box>
        </div>
    )
}
export default ComplaintForm;