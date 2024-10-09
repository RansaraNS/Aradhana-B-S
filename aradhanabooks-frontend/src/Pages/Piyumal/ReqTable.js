import { Box } from "@mui/material";
import AdminHead from "../../Components/Sasin/AdminHead.js";
import AdminFoot from "../../Components/Sasin/AdminFoot.js";
import WcAllDetails from "../../Components/Piyumal/WcAllDetails.js";

const ReqTable = () => {
  return (
    <Box>
      <AdminHead />
      
      <WcAllDetails />
      
      <AdminFoot />
    </Box>
  );
};

export default ReqTable;
