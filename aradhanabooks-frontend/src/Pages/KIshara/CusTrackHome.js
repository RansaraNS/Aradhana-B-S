import { Box } from "@mui/material";

import HomeHead from "../../Components/Sasin/HomeHead";
import HomeFoot from "../../Components/Sasin/HomeFoot";
import TrackingHomeCus from "../../Components/KIshara/TrackingHomeCus";

const CusTrackHome = () => {
  return (
    <div>
      <Box>
        <HomeHead />
        <br/>
        <TrackingHomeCus />
        <HomeFoot />
      </Box>
    </div>
  );
};
export default CusTrackHome;
