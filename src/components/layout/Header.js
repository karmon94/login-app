import Button from "@mui/material/Button";
import { useContext } from "react";
import { UserContext } from "../../app/UserContextProvider";

import "./Header.css";

const Header = () => {
  const userCtxt = useContext(UserContext);

  const logOutHandler = () => {
    userCtxt.logout();
  };

  return (
    <div className="header-container">
      <div className="logo-container">
        <h2>Login App</h2>
      </div>
      <div className="buttons-container">
        <Button variant="outlined" onClick={logOutHandler}>
          Log out
        </Button>
      </div>
    </div>
  );
};

export default Header;
