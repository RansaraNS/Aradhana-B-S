import {Box} from "@mui/material"
import AdminHead from "../../Components/Sasin/AdminHead.js"
import AdminFoot from "../../Components/Sasin/AdminFoot.js"
import CompletedComplaints from "../../Components/Iresha/AdminCompletedComplaints.js"

const ComplaintCompletedAdmin= () => {
    return(
        <div>
            <Box>
                <AdminHead/>
                <CompletedComplaints/>
                <br/>
                
                <AdminFoot/>
            </Box>
        </div>
    )
}
export default ComplaintCompletedAdmin;



