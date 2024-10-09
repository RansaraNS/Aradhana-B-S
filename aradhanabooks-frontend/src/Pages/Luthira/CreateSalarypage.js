import { Box } from "@mui/material";
import AdminHead from "../../Components/Sasin/AdminHead";
import CreateSalary from "../../Components/Luthira/CreateSalary";
import AdminFoot from "../../Components/Sasin/AdminFoot";



const CreateSalarypage = () => {
    return(
        <Box>
             <AdminHead/>
             <CreateSalary/>
             <AdminFoot/>
        </Box>
    )
}

export default CreateSalarypage;