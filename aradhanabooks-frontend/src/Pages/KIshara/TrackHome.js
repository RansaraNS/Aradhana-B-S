import { Box } from "@mui/material";
import TrackingHome from "../../Components/KIshara/TrackingHome";
import AdminHead from "../../Components/Sasin/AdminHead";
import AdminFoot from "../../Components/Sasin/AdminFoot";

const TrackHome = () => {
  return (
    <div>
      <Box>
        <AdminHead />
        <TrackingHome />
        <AdminFoot />
      </Box>
    </div>
  );
};
export default TrackHome;
