import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Logo from "./Shared/logo";
import { useAuth } from "../Context/authcontext";
import NavigationLink from "./Shared/navigationlink";

const Header = () => {
  const auth = useAuth();
  return (
    <AppBar
      sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}
    >
      <Toolbar sx={{ display: "flex" }}>
        <Logo />
        <div>
          {auth?.isLoggedIn ? (
            <>
           
              <NavigationLink
                bg="#DB1313"
                textColor="white"
                to="/"
                text="logout"
                onClick={auth.logout}
              />
            </>
          ) : (
            <>
              <NavigationLink
                bg="#DB1313"
                to="/login"
                text="Login"
                textColor="white"
              />
              <NavigationLink
                bg="#000000"
                textColor="white"
                to="/signup"
                text="Signup" 
               
              />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;