import { Box } from "@mui/material";
import HomeHead from '../../Components/Sasin/HomeHead.js'
import HomeFoot from "../../Components/Sasin/HomeFoot.js"
import ItemPreview from "../../Components/Piyumal/ItemPreview.js"


const PreviewItem = () => {
    return ( 
        <Box>
           <HomeHead />
           <br/>
           <br/>
           <br/>
            <ItemPreview/>
            <br/>
           <HomeFoot/>
        </Box>
      );
}

  

export default PreviewItem;
