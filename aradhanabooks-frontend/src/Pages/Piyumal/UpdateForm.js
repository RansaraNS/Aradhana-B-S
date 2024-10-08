import { Box } from "@mui/material";
import HomeHead from "../../Components/Sasin/HomeHead.js";
import HomeFoot from "../../Components/Sasin/HomeFoot.js";
import WcReqUpdate from "../../Components/Piyumal/WcReqUpdate.js";

const UpdateForm = () => {
  return (
    <div>
      <Box>
        <HomeHead />
        <br/>
        <br/>
        <WcReqUpdate />
        <HomeFoot />
      </Box>
    </div>
  );
};
export default UpdateForm;
