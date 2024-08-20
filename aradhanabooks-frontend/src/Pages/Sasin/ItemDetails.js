import { Box } from "@mui/material";
import AddItemForm from "../../Components/Sasin/AddItemForm";
import ItemTable from "../../Components/Sasin/ItemTable";

const StockDetails = () => {
    return(
        <Box>
            <AddItemForm />
            <ItemTable />
        </Box>
    );
}

export default StockDetails;