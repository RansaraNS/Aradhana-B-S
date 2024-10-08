import {Box} from "@mui/material"
import CustomerHead from '../../Components/Sasin/CustomerHead.js'
import AdminFoot from "../../Components/Sasin/AdminFoot.js"
import WcusView from "../../Components/Piyumal/WcusView.js";



const CusView = () => {
    return(
        <div>
            <Box>
            <CustomerHead />
            <br/>
            <br/>     
            <WcusView/>
            <br/>
            <br/>
            <br/>
            <br/> 
            <br/>
            <br/>
            <br/>
            <br/>
            <AdminFoot/>
            </Box>
        </div>
    );

}
export default CusView;