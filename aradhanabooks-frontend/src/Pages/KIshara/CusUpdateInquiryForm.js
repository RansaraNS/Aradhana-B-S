
import { Box } from "@mui/material";

import HomeHead from "../../Components/Sasin/HomeHead";
import HomeFoot from "../../Components/Sasin/HomeFoot";
import UpdateInquiryForm from "../../Components/KIshara/UpdateInquiryForm";

const CusUpdateInquiryForm = () => {
  return (
    <div>
      <Box>
        <HomeHead />
        <br/>
        <UpdateInquiryForm/>
        <HomeFoot />
      </Box>
    </div>
  );
};
export default CusUpdateInquiryForm;
