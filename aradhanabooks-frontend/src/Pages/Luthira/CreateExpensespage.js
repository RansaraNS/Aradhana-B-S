import { Box } from "@mui/material";
import AdminHead from "../../Components/Sasin/AdminHead";
import CreateExpenses from "../../Components/Luthira/CreateExpenses";
import AdminFoot from "../../Components/Sasin/AdminFoot";


const CreateExpensespage = () => {
    return(
        <Box>
             <AdminHead/>
             <CreateExpenses/>
             <AdminFoot/>
        </Box>
    )
}

export default CreateExpensespage;