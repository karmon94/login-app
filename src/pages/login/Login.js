import { useState } from "react";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HttpsIcon from "@mui/icons-material/Https";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import isEmail from "validator/lib/isEmail";

import "./Login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    showPassword: false,
  });

  const [userValidator, setUserValidator] = useState(true);
  const [passValidator, setPassValidator] = useState(true);
  const [messageError, setMessageError] = useState(" ");

  const handleChange = (prop) => (event) => {
    if (prop === "username") {
      if (isEmail(event.target.value)) {
        setUserValidator(true);
      } else {
        setUserValidator(false);
      }
    }
    setCredentials({ ...credentials, [prop]: event.target.value });
    setMessageError("");
  };

  const handleClickShowPassword = () => {
    setCredentials({
      ...credentials,
      showPassword: !credentials.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmitHandle = (e) => {
    e.preventDefault();
    if (userValidator && passValidator) {
      // INICIO DE SESION
      //SI NO HAY ERROR HACEMOS UN NAVIGATE
      //SI HAY ERROR EN CREDENCIALES SE MUESTRA EL MENSAJE
      setMessageError("Usuario/Contraseña incorrectos");
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h2>Login</h2>
      </div>

      <form className="form" onSubmit={onSubmitHandle}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <AccountCircleIcon sx={{ color: "action.active" }} />
          <TextField
            error={!userValidator}
            required
            label="Email"
            variant="standard"
            value={credentials.username}
            onChange={handleChange("username")}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <HttpsIcon sx={{ color: "action.active" }} />

          <FormControl
            sx={{
              width: "195px",
              display: "flex",
              justifyContent: "space-between",
              alignContent: "flex-end",
            }}
            variant="standard"
          >
            <InputLabel htmlFor="standard-adornment-password">
              Contraseña *
            </InputLabel>
            <Input
              required
              id="standard-adornment-password"
              type={credentials.showPassword ? "text" : "password"}
              value={credentials.password}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {credentials.showPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Box>

        <Button sx={{ marginTop: "10px" }} variant="contained" type="submit">
          LOGIN
        </Button>

        <div className="errorMessage">
          <p>{messageError}</p>
        </div>
      </form>

      <div className="login-footer">
        <h6>SIGN UP</h6>
      </div>
    </div>
  );
};

export default Login;
