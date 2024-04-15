import { Box, Typography, Button, useMediaQuery, useTheme } from '@mui/material';
import TypingAnim from '../Components/Typer/typinganim';
import NavigationLink from '../Components/Shared/navigationlink';

const Home = () => {
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down('md'));
  
  return (
    <Box width={'100%'} height={'100%'}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mx: 'auto',
          mt: 3,
        }}
      >
        <Box sx={{ display: 'flex', mx: 'auto', mt: 10 }}>
          <img
            src="../../AdaLogo3.webp"
            alt="chatbot"
            style={{
              display: 'flex',
              margin: 'auto',
              width: isBelowMd ? '80%' : '28%',
              borderRadius: 20,
              boxShadow: '-5px -5px 70px #DB1313',
            }}
          />
        </Box>
        <Box sx={{ mt: 4 }}>
          <TypingAnim />
        </Box>
        <Box sx={{ mt: 4, textAlign: 'center' }}>
      
          <Typography sx={{ my: 2, fontSize:20}}>
            Join us and enhance your game development skills with Ada, your AI assistant. <br />
            Sign up to start learning or log in to continue your journey.
          </Typography>
          <Box sx={{ mt: 6, textAlign: 'center' }}>
          <NavigationLink
                bg="#DB1313"
                to="/login"
                text="Get Started"
                textColor="white"
              />

          </Box>
         
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
