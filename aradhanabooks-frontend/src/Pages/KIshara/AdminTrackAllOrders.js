import { Box } from "@mui/material";

import TrackingAllOrders from "../../Components/KIshara/TrackingAllOrders";
import AdminHead from "../../Components/Sasin/AdminHead";
import AdminFoot from "../../Components/Sasin/AdminFoot";

const AdminTrackAllOrders = () => {
  return (
    <div>
      <Box>
        <AdminHead />
        <TrackingAllOrders/>
        <AdminFoot />
      </Box>
    </div>
  );
};
export default AdminTrackAllOrders;
