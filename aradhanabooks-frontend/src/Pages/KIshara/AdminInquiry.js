import { Box } from "@mui/material";

import InquiryList from "../../Components/KIshara/InquiryList";
import AdminHead from "../../Components/Sasin/AdminHead";
import AdminFoot from "../../Components/Sasin/AdminFoot";

const AdminTrackInquiry = () => {
  return (
    <div>
      <Box>
        <AdminHead />
        <InquiryList />
        <AdminFoot />
      </Box>
    </div>
  );
};
export default AdminTrackInquiry;
