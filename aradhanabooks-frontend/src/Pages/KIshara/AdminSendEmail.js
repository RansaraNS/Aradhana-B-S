import { Box } from "@mui/material";
import SendEmail from "../../Components/KIshara/SendEmail";
import AdminHead from "../../Components/Sasin/AdminHead";
import AdminFoot from "../../Components/Sasin/AdminFoot";

const AdminSendEmail = () => {
  return (
    <div>
      <Box>
        <AdminHead />
        <SendEmail/>
        <AdminFoot />
      </Box>
    </div>
  );
};
export default AdminSendEmail;
