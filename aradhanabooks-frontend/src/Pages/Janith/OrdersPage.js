import { Box } from "@mui/material";
import AdminHead from '../../Components/Sasin/AdminHead.js';
import Orders from "../../Components/Janith/Orders.js";
import AdminFoot from "../../Components/Sasin/AdminFoot.js";


const OrdersPage = () =>{

    return(
        <Box>
            <AdminHead/>
            <Orders/>
            <AdminFoot/>
        </Box>
    )
}
export default OrdersPage;