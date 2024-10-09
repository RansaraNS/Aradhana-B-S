import { Box } from "@mui/material";

import InProgressOrders from "../../Components/KIshara/InProgressOrder";
import AdminHead from "../../Components/Sasin/AdminHead";
import AdminFoot from "../../Components/Sasin/AdminFoot";

const AdminInProgress = () => {
  return (
    <div>
      <Box>
        <AdminHead />
        <InProgressOrders />
        <AdminFoot />
      </Box>
    </div>
  );
};
export default AdminInProgress;
