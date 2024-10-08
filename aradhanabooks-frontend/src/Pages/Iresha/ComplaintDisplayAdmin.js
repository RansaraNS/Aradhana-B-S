import {Box} from "@mui/material"
import AdminHead from "../../Components/Sasin/AdminHead.js"
import AdminFoot from "../../Components/Sasin/AdminFoot.js"
import AdminDisplayComplaints from "../../Components/Iresha/AdminDisplayComplaints.js"

const ComplaintDisplayAdmin= () => {
    return(
        <div>
            <Box>
                <AdminHead/>
                <AdminDisplayComplaints/>
                <br/>
                
                <AdminFoot/>
            </Box>
        </div>
    )
}
export default ComplaintDisplayAdmin;