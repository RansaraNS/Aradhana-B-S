import {Box} from "@mui/material"
import AdminHead from "../../Components/Sasin/AdminHead.js"
import AdminFoot from "../../Components/Sasin/AdminFoot.js"
import PendingComplaints from "../../Components/Iresha/AdminPendingComplaints.js"

const ComplaintPendingAdmin= () => {
    return(
        <div>
            <Box>
                <AdminHead/>
                <PendingComplaints/>
                <br/>
                
                <AdminFoot/>
            </Box>
        </div>
    )
}
export default ComplaintPendingAdmin;