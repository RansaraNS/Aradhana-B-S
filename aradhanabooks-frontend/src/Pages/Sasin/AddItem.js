import { Box } from "@mui/material";
import AdminHead from '../../Components/Sasin/AdminHead.js';
import AdminFoot from "../../Components/Sasin/AdminFoot.js";
import AddItemForm from "../../Components/Sasin/AddItemForm.js";

const ItemA = () => {
    return(
        <Box>
            <AdminHead />
            <AddItemForm />
            <AdminFoot />
        </Box>
    );
}

export default ItemA;