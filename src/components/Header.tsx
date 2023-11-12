import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const styles = {
  color: "white",
  margin: "0.5rem",
  textDecoration: "none",
};

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" mr={"auto"} textTransform={"uppercase"}>
          Learndo.
        </Typography>
        <Link to={"/"} style={styles}>
          Home
        </Link>
        <Link to={"/login"} style={styles}>
          Login
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
