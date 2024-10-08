import { Box, Button } from "@mui/material";
import RidersTable from "./RidersTable";
import Axios from "axios";
import { useEffect, useState } from "react";
import RiderForm from "./RiderForm";
import { useNavigate } from "react-router-dom";

const Riders = () => {
  const [riders, setRiders] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedRider, setSelectedRider] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getRiders();
  }, []);

  const getRiders = () => {
    Axios.get('http://localhost:2001/api/riders')
      .then(response => {
        setRiders(response?.data?.response || []);
      })
      .catch(error => {
        console.error("Axios Error :", error);
      });
  };

  const updateRider = (data) => {
    setSubmitted(true);

    const payload = {
      id: data.id,
      name: data.name,
      telephone: data.telephone,
      email: data.email,
      vehicletype: data.vehicletype,
      licensetype: data.licensetype,
    };

    Axios.post('http://localhost:2001/api/updaterider', payload)
      .then(() => {
        getRiders();
        setSubmitted(false);
        setIsEdit(false);
      })
      .catch(error => {
        console.error("Axios Error :", error);
      });
  };

  const deleteRider = (data) => {
    Axios.post('http://localhost:2001/api/deleterider', data)
      .then(() => {
        getRiders();
      })
      .catch(error => {
        console.error("Axios Error :", error);
      });
  };

  return (
    <Box sx={{ width: 'calc(100% - 100px)',
      margin: 'auto',
      marginTop: '100px',
      backgroundColor: '#0e450e',
      padding: '20px',
      borderRadius: '8px'
    }}>
      <RidersTable
        rows={riders}
        selectedRider={(data) => {
          setSelectedRider(data);
          setIsEdit(true);
        }}
        deleteRider={(data) => window.confirm('Are You Sure?') && deleteRider(data)}
      />
      {isEdit && (
        <RiderForm
          updateRider={updateRider}
          submitted={submitted}
          data={selectedRider}
          isEdit={isEdit}
        />
      )}
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

export default Riders;
