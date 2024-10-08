import { Box } from "@mui/material";
import AdminHead from '../../Components/Sasin/AdminHead.js';
import CreateRider from "../../Components/Janith/CreateRider.js";
import AdminFoot from "../../Components/Sasin/AdminFoot.js";


const CreateRiderPage = () =>{

    return(
        <Box>
            <AdminHead/>
            <CreateRider/>
            <AdminFoot/>
        </Box>
    )
}
export default CreateRiderPage;