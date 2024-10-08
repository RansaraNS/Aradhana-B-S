import { Box } from "@mui/material";
import AdminHead from '../../Components/Sasin/AdminHead';
import AdminFoot from "../../Components/Sasin/AdminFoot.js";
import UpdateItemForm from "../../Components/Sasin/UpdateItemForm.js";

const UpdateItem = () => {
    return(
        <Box>
            <AdminHead />
            <UpdateItemForm />
            <AdminFoot />
        </Box>
    );
}

export default UpdateItem;