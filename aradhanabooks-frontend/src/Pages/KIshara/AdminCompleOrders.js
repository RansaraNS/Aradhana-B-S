
import { Box } from "@mui/material";
import CompleteOrders from "../../Components/KIshara/CompleteOrders";
import AdminHead from "../../Components/Sasin/AdminHead";
import AdminFoot from "../../Components/Sasin/AdminFoot";

const AdminCompleOrders = () => {
  return (
    <div>
      <Box>
        <AdminHead />
        < CompleteOrders/>
        <AdminFoot />
      </Box>
    </div>
  );
};
export default AdminCompleOrders;
