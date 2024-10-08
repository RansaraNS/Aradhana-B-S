import { Box } from "@mui/material";

import TrackReport from "../../Components/KIshara/TrackReport";
import AdminHead from "../../Components/Sasin/AdminHead";
import AdminFoot from "../../Components/Sasin/AdminFoot";

const AdminTrackReport = () => {
  return (
    <div>
      <Box>
        <AdminHead />
        <TrackReport/>
        <AdminFoot />
      </Box>
    </div>
  );
};
export default AdminTrackReport;
