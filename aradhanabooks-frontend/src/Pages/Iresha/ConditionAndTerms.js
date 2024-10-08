import {Box} from "@mui/material"
import HomeHead from "../../Components/Sasin/HomeHead.js"
import HomeFoot from "../../Components/Sasin/HomeFoot.js"
import TermsAndConditions from "../../Components/Iresha/TermsAndConditions.js"

const ConditionAndTerms = () => {
    return(
        <div>
            <Box>
                <HomeHead/><br/><br/><br/>
                <TermsAndConditions/>
                <br/>
                
                <HomeFoot/>
            </Box>
        </div>
    )
}
export default ConditionAndTerms;