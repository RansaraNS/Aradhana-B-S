import {Box} from "@mui/material"
import HomeHead from '../../Components/Sasin/HomeHead.js'
import HomeFoot from "../../Components/Sasin/HomeFoot.js"
import WcReqUpdate from "../../Components/Piyumal/WcReqDetail.js"

const SingleDetail = () => {
    return(
        <div>
            <Box>
            <HomeHead />
            <br/>
            <br/>     
            <WcReqUpdate/>
            <br/>
            <br/>
            <HomeFoot/>
            </Box>
        </div>
    );

}
export default SingleDetail;