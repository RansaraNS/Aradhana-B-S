import { Box } from "@mui/material";

import PendingOrders from "../../Components/KIshara/PendingOrders";
import AdminHead from "../../Components/Sasin/AdminHead";
import AdminFoot from "../../Components/Sasin/AdminFoot";

const AdminPendingOrders = () => {
  return (
    <div>
      <Box>
        <AdminHead />
        <PendingOrders />
        <AdminFoot />
      </Box>
    </div>
  );
};
export default AdminPendingOrders;
