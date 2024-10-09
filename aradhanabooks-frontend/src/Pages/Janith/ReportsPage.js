import { Box } from "@mui/material";
import AdminHead from '../../Components/Sasin/AdminHead.js';
import Report from "../../Components/Janith/Report.js";
import AdminFoot from "../../Components/Sasin/AdminFoot.js";

const ReportsPage = () =>{

    return(
        <Box>
            <AdminHead/>
            <Report/>
            <AdminFoot/>       
        </Box>
    )
}
export default ReportsPage;