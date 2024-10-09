
import { Box } from "@mui/material";

import PendingOrderDetails from "../../Components/KIshara/PendingOrderDetails";
import AdminHead from "../../Components/Sasin/AdminHead";
import AdminFoot from "../../Components/Sasin/AdminFoot";

const AdminPendingOrderDetails = () => {
  return (
    <div>
      <Box>
        <AdminHead />
        <PendingOrderDetails/>
        <AdminFoot />
      </Box>
    </div>
  );
};
export default AdminPendingOrderDetails;
