
import { Box } from "@mui/material";

import HomeHead from "../../Components/Sasin/HomeHead";
import HomeFoot from "../../Components/Sasin/HomeFoot";
import TrackInquiryForm from "../../Components/KIshara/TrackInquiryForm";


const CusTrackInquiryForm = () => {
  return (
    <div>
      <Box>
        <HomeHead />
        <br/>
        <TrackInquiryForm/>
        <HomeFoot />
      </Box>
    </div>
  );
};
export default CusTrackInquiryForm;

