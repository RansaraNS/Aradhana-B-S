import { Box } from "@mui/material";
import AdminHead from '../../Components/Sasin/AdminHead.js';
import App from "../../Components/Janith/App.js";
import AdminFoot from "../../Components/Sasin/AdminFoot.js";



const OrdersPage = () =>{

    return(
        <Box>
            <AdminHead/>
            <App/>
            <AdminFoot/>
        </Box>
    )
}
export default OrdersPage;