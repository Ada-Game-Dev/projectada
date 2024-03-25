import { Box, useMediaQuery, useTheme } from "@mui/material";
import TypingAnim from "../Components/Typer/typinganim";

const Home = () => {
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box width={"100%"} height={"100%"}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          mx: "auto",
          mt: 3,
        }}
      >
        <Box sx={{ display: "flex", mx: "auto" }}>
          <img
            src="../../AdaLogo3.webp"
            alt="chatbot"
            style={{
              display: "flex",
              margin: "auto",
              width: isBelowMd ? "80%" : "35%",
              borderRadius: 20,
              boxShadow: "-5px -5px 70px #DB1313",
              marginTop: 140,
              marginBottom: 90,
            
            }}
          />
        </Box>
        <Box>
          <TypingAnim />
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: { md: "row", xs: "column", sm: "column" },
            gap: 5,
            my: 10,
          }}
        >
         
         
        </Box>
        
      </Box>
    </Box>
  );
};

export default Home;