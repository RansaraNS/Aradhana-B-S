import { Box } from "@mui/material";
import HomeHead from '../../Components/Sasin/HomeHead.js'
import HomeFoot from "../../Components/Sasin/HomeFoot.js"
import Cart from "../../Components/Piyumal/Cart.js";


const ViewCart = () => {
    return (
        <Box>
           <HomeHead />
           <br/>
           <br/>
           <br/>
            <Cart/>
            <br/>
           <HomeFoot/>
        </Box>
      );
}

  

export default ViewCart;
