import Typography from "@mui/material/Typography";
import NavigationLink from "./navigationlink";
const Logo = () => {
  return (
    <div
      style={{
        display: "flex",
        marginRight: "auto",
        alignItems: "center",
        gap: "15px",
      }}
    >
    
      <Typography
        sx={{
          display: { md: "block", sm: "none", xs: "none" },
          mr: "auto",
          fontWeight: "800",
          textShadow: "2px 2px 20px #000",
        }}
      >
        <NavigationLink
                bg="#000000"
                to="/"
                text="AdaCHATBOT"
                textColor="white"
              />
      </Typography>
    </div>
  );
};

export default Logo;