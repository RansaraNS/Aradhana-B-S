import { Box } from "@mui/material";

import TrackingAllOrderDetails from "../../Components/KIshara/TrackinAllOrderDetail"
import AdminHead from "../../Components/Sasin/AdminHead";
import AdminFoot from "../../Components/Sasin/AdminFoot";


const AdminTrackAllorder = () => {
  return (
    <div>
      <Box>
        <AdminHead />
       <TrackingAllOrderDetails/>
        <AdminFoot />
      </Box>
    </div>
  );
};
export default AdminTrackAllorder;
