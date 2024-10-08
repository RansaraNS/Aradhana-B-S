import { Box } from "@mui/material";
import AdminHead from "../../Components/Sasin/AdminHead";
import GenReport from "../../Components/Luthira/GenReport";
import AdminFoot from "../../Components/Sasin/AdminFoot";



const GenReportpage = () => {
    return(
        <Box>
             <AdminHead/>
             <GenReport/>
             <AdminFoot/>
        </Box>
    )
}

export default GenReportpage;