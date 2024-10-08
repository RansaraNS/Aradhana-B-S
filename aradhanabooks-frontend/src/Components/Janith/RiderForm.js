import { Button, Grid, InputLabel, TextField, Select, MenuItem, Box, FormControl } from "@mui/material";
import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const RiderForm = ({ createRider, updateRider, submitted, data, isEdit, viewRider }) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [vehicletype, setVehicletype] = useState('');
  const [licensetype, setLicensetype] = useState('');
  const [emailError, setEmailError] = useState('');
  const [telephoneError, setTelephoneError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!submitted) {
      setId('');
      setName('');
      setTelephone('');
      setEmail('');
      setVehicletype('');
      setLicensetype('');
      setEmailError('');
      setTelephoneError('');
      setNameError('');
    }
  }, [submitted]);

  useEffect(() => {
    if (data?.id && data.id !== 0) {
      setId(data.id);
      setName(data.name);
      setTelephone(data.telephone);
      setEmail(data.email);
      setVehicletype(data.vehicletype);
      setLicensetype(data.licensetype);
    }
  }, [data]);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateTelephone = (telephone) => {
    const regex = /^\d{10}$/;
    return regex.test(telephone);
  };

  const validateName = (name) => {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(name);
  };

  const handleNameChange = (e) => {
    const nameValue = e.target.value;
    setName(nameValue);

    if (validateName(nameValue)) {
      setNameError('');
    } else {
      setNameError('Name can only contain letters and spaces');
    }
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    if (validateEmail(emailValue)) {
      setEmailError('');
    } else {
      setEmailError('Invalid email format');
    }
  };

  const handleTelephoneChange = (e) => {
    const telephoneValue = e.target.value;
    setTelephone(telephoneValue);

    if (validateTelephone(telephoneValue)) {
      setTelephoneError('');
    } else {
      setTelephoneError('Telephone must be exactly 10 digits');
    }
  };

  const handleSubmit = () => {
    if (emailError || telephoneError || nameError) {
      
      return;
    }
    isEdit
      ? updateRider({ id, name, telephone, email, vehicletype, licensetype })
      : createRider({ id, name, telephone, email, vehicletype, licensetype });
  };

  const theme = createTheme({
    components: {
      MuiInputLabel: {
        styleOverrides: {
          root: {
            '&.Mui-focused': {
              color: '#c21c63',
            },
            '&.MuiInputLabel-shrink': {
              display: 'none',
            },
            '&:hover': {
              display: 'block',
              color: '#c21c63',
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: '#f9f9f9',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                label="ID"
                variant="outlined"
                value={id}
                onChange={e => setId(e.target.value)}
                sx={{
                  '& input:not(:placeholder-shown) + fieldset legend': {
                    display: 'none',
                  },
                }}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                label="Name"
                variant="outlined"
                value={name}
                onChange={handleNameChange}
                error={!!nameError}
                helperText={nameError}
                sx={{
                  '& input:not(:placeholder-shown) + fieldset legend': {
                    display: 'none',
                  },
                }}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                label="Telephone"
                variant="outlined"
                value={telephone}
                onChange={handleTelephoneChange}
                error={!!telephoneError}
                helperText={telephoneError}
                sx={{
                  '& input:not(:placeholder-shown) + fieldset legend': {
                    display: 'none',
                  },
                }}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                label="Email"
                variant="outlined"
                value={email}
                onChange={handleEmailChange}
                error={!!emailError}
                helperText={emailError}
                sx={{
                  '& input:not(:placeholder-shown) + fieldset legend': {
                    display: 'none',
                  },
                }}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Vehicle Type</InputLabel>
              <Select
                value={vehicletype}
                onChange={e => setVehicletype(e.target.value)}
                sx={{
                  '&:not(:focus) + .MuiInputLabel-outlined': {
                    display: vehicletype ? 'none' : 'block',
                  },
                  '&:hover + .MuiInputLabel-outlined': {
                    display: 'block',
                  },
                }}
              >
                <MenuItem value="Bike">Bike</MenuItem>
                <MenuItem value="Car">Car</MenuItem>
                <MenuItem value="Three-Wheel">Three-Wheel</MenuItem>
                <MenuItem value="Van">Van</MenuItem>
                <MenuItem value="Lorry">Lorry</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>License Type</InputLabel>
              <Select
                value={licensetype}
                onChange={e => setLicensetype(e.target.value)}
                sx={{
                  '&:not(:focus) + .MuiInputLabel-outlined': {
                    display: licensetype ? 'none' : 'block',
                  },
                  '&:hover + .MuiInputLabel-outlined': {
                    display: 'block',
                  },
                }}
              >
                <MenuItem value="Personal Vehicle License">Personal Vehicle License</MenuItem>
                <MenuItem value="Commercial Vehicle License">Commercial Vehicle License</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{
                marginRight: '10px',
                backgroundColor: '#c21c63',
                '&:hover': {
                  backgroundColor: '#b71b5b',
                },
              }}
            >
              {isEdit ? 'Update Rider' : 'Create Rider'}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate('/riders')}
              sx={{
                borderColor: '#c21c63',
                color: '#c21c63',
                '&:hover': {
                  borderColor: '#b71b5b',
                  color: '#b71b5b',
                },
              }}
            >
              View Rider
            </Button>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default RiderForm;
