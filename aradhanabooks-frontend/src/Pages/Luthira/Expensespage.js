import { Box } from "@mui/material";
import AdminHead from "../../Components/Sasin/AdminHead";
import Expenses from "../../Components/Luthira/Expenses";
import AdminFoot from "../../Components/Sasin/AdminFoot";


const CreateExpensespage = () => {
    return(
        <Box>
             <AdminHead/>
             <Expenses/>
             <AdminFoot/>
        </Box>
    )
}

export default CreateExpensespage;