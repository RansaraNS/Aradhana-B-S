import { Box } from "@mui/material";
import AdminHead from "../../Components/Sasin/AdminHead";
import SalaryDetails from "../../Components/Luthira/SalaryDetails";
import AdminFoot from "../../Components/Sasin/AdminFoot";




const SalaryDetailspage = () => {
    return(
        <Box>
             <AdminHead/>
             <SalaryDetails/>
             <AdminFoot/>
        </Box>
    )
}

export default SalaryDetailspage;