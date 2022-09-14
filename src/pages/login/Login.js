import { useContext, useState } from "react";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HttpsIcon from "@mui/icons-material/Https";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import isEmail from "validator/lib/isEmail";

import "./Login.css";
import { UserContext } from "../../app/UserContextProvider";
import { useNavigate } from "react-router-dom";

const DUMMY_USER = { username: "test@test.com", password: "test123" };

const Login = () => {
  const userCtxt = useContext(UserContext);
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    showPassword: false,
    userValid: true,
    messageError: "",
    loading: false,
  });

  const handleChange = (prop) => (event) => {
    if (prop === "username") {
      if (isEmail(event.target.value)) {
        setCredentials({
          ...credentials,
          username: event.target.value,
          userValid: true,
        });
      } else {
        setCredentials({
          ...credentials,
          username: event.target.value,
          userValid: false,
        });
      }
    } else {
      setCredentials({
        ...credentials,
        password: event.target.value,
        messageError: "",
      });
    }
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
    if (credentials.userValid) {
      setCredentials({
        ...credentials,
        loading: true,
      });

      setTimeout(() => {
        if (
          credentials.username === DUMMY_USER.username &&
          credentials.password === DUMMY_USER.password
        ) {
          userCtxt.login({
            usuario: credentials.username,
            password: credentials.password,
          });

          navigate("/home", { replace: true });
        } else {
          setCredentials({
            ...credentials,
            loading: false,
            messageError: "Email/Password incorrectos",
          });
        }
      }, 2000);
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
            error={!credentials.userValid}
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

        <LoadingButton
          type="submit"
          loading={credentials.loading}
          variant="contained"
        >
          LOGIN
        </LoadingButton>

        <div className="errorMessage">
          <p>{credentials.messageError}</p>
        </div>
      </form>

      <div className="login-footer">
        <h6>SIGN UP</h6>
      </div>
    </div>
  );
};

export default Login;
