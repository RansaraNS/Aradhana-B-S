import { Box } from "@mui/material";
import AdminHead from '../../Components/Sasin/AdminHead.js';
import AdminFoot from "../../Components/Sasin/AdminFoot.js";
import ItemTable from "../../Components/Sasin/ItemTable";

const StockDetails = () => {
    return(
        <Box>
            <AdminHead />
            <ItemTable />
            <AdminFoot />
        </Box>
    );
}

export default StockDetails;