import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RiderForm from "./RiderForm";
import Axios from "axios";
import { useState } from "react";

const CreateRider = () => {
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const createRider = (data) => {
    setSubmitted(true);

    const payload = {
      id: data.id,
      name: data.name,
      telephone: data.telephone,
      email: data.email,
      vehicletype: data.vehicletype,
      licensetype: data.licensetype,
    };
    Axios.post('http://localhost:2001/api/createrider', payload)
      .then(() => {
        setSubmitted(false);
      })
      .catch(error => {
        console.error("Axios Error:", error);
      });
  };

  return (
    <Box
      sx={{
        width: 'calc(100% - 100px)',
        margin: 'auto',
        marginTop: '100px',
        backgroundColor: '#0e450e', // Added background color here
        padding: '20px', // Optional: Added some padding for better appearance
        borderRadius: '8px' // Optional: Add border radius to soften the edges
      }}>
      <RiderForm
        createRider={createRider}
        submitted={submitted}
        data={{}}
        isEdit={false}
      />

      <Button
        sx={{
          marginTop: '20px',
          backgroundColor: '#c21c63',
          color: '#fff',
          padding: '10px 20px',
          fontSize: '16px',
          borderRadius: '5px',
          '&:hover': {
            opacity: '0.8',
            backgroundColor: '#b71b5b',
          },
        }}
        onClick={() => navigate('/app')}
      >
        Dashboard
      </Button>
    </Box>
  );
};

export default CreateRider;
