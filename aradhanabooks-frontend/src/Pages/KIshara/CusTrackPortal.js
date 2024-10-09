import { Box } from "@mui/material";

import HomeHead from "../../Components/Sasin/HomeHead";
import HomeFoot from "../../Components/Sasin/HomeFoot";
import TrackingPortalCus from "../../Components/KIshara/trackingPortalCus";

const CusTrackPortal = () => {
  return (
    <div>
      <Box>
        <HomeHead />
        <br/>
        <TrackingPortalCus/>
        <HomeFoot />
      </Box>
    </div>
  );
};
export default CusTrackPortal;
