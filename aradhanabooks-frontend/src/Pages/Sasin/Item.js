import { Box } from "@mui/material";
import HomeHead from "../../Components/Sasin/HomeHead"
import HomeFoot from "../../Components/Sasin/HomeFoot";
import ItemBody from "../../Components/Sasin/ItemBody";


const ItemH = () => {
    return(
        <Box>
            <HomeHead />
            <ItemBody />
            <HomeFoot />
        </Box>
    );
}

export default ItemH;