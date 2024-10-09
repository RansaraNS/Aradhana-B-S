import {Box} from "@mui/material"
import HomeHead from "../../Components/Sasin/HomeHead.js"
import HomeFoot from "../../Components/Sasin/HomeFoot.js"
import DisplayComplaints from "../../Components/Iresha/DisplayComplaints.js"

const ComplaintsDisplay = () => {
    return(
        <div>
            <Box>
                <HomeHead/><br/><br/><br/>
                <DisplayComplaints/>
                <br/>
                
                <HomeFoot/>
            </Box>
        </div>
    )
}
export default ComplaintsDisplay;