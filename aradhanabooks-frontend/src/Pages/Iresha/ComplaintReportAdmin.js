import {Box} from "@mui/material"
import AdminHead from "../../Components/Sasin/AdminHead.js"
import AdminFoot from "../../Components/Sasin/AdminFoot.js"
import ComplaintsReport from "../../Components/Iresha/AdminComplaintsReport.js"

const ComplaintReportAdmin= () => {
    return(
        <div>
            <Box>
                <AdminHead/>
                <ComplaintsReport/>
                <br/>
                
                <AdminFoot/>
            </Box>
        </div>
    )
}
export default ComplaintReportAdmin;








