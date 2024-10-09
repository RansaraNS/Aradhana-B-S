import { Box } from "@mui/material";
import CancelOrders from "../../Components/KIshara/CancelOrders";
import AdminHead from "../../Components/Sasin/AdminHead";
import AdminFoot from "../../Components/Sasin/AdminFoot";

const AdminOrderCancel = () => {
  return (
    <Box>
      <AdminHead />
        <CancelOrders/>
      <AdminFoot />
    </Box>
  );
};
export default AdminOrderCancel;