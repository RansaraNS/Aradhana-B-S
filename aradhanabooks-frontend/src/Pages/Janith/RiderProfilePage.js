import { Box } from "@mui/material";
import AdminHead from '../../Components/Sasin/AdminHead.js';
import RiderProfiles from "../../Components/Janith/RiderProfiles.js";
import AdminFoot from "../../Components/Sasin/AdminFoot.js";




const RidersPage = () =>{

    return(
        <Box>
            <AdminHead/>
            <RiderProfiles/>
            <AdminFoot/>
        </Box>
    )
}
export default RidersPage;