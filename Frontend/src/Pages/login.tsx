import React, { useEffect } from "react";
import { IoIosLogIn } from "react-icons/io";
import { Box, Typography, Button } from "@mui/material";
import CustomizedInput from "../Components/Shared/customizedinput";
import { toast } from "react-hot-toast";
import { useAuth } from "../Context/authcontext";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      toast.loading("Signing In", { id: "login" });
      await auth?.login(email, password);
      toast.success("Signed In Successfully", { id: "login" });
    } catch (error) {
      console.log(error);
      toast.error("Signing In Failed", { id: "login" });
    }
  };
  useEffect(() => {
    if (auth?.user) {
      return navigate("/chat");
    }
  }, [auth]);
  return (
    <Box width={"100vw"} height={"100vh"} display="flex">
  {/* Left Side with Illustration and Text */}
  <Box bgcolor={'#DB1313'} flex={1} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
    <Box 
      component="img"
      src="..\AdaIllustration.svg"
      alt="Ada"
      sx={{
        width: { xs: '80%', sm: '60%', md: '300px' },
        maxWidth: '400px'
      }}
    />
    <Typography
      variant="h3"
      textAlign="center"
      color="white"
      mt={4}
      sx={{
        fontWeight: 500,
        width: '60%',
      }}
    >
      Ada Chatbot: Unleash your creativity!
    </Typography>
    <Typography
      variant="subtitle1"
      textAlign="center"
      color="white"
      my={4}
      sx={{
        fontWeight: 300
      }}
    >
      Bring your Projects to life
    </Typography>
  </Box>
  
  {/* Right Side with Login Form */}
  <Box bgcolor={'#222222'} flex={1} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
    <Box
      bgcolor="transparent"
      p={5}
      sx={{
        width: { xs: '80%', sm: '70%', md: '50%' },
        maxWidth: '500px',
        boxSizing: 'border-box'
      }}
    >
      <Typography
        variant="h4"
        textAlign="center"
        color="white"
        gutterBottom
      >
        Log In
      </Typography>
      <form onSubmit={handleSubmit}>
        <CustomizedInput type="email" name="email" label="Email" />
        <CustomizedInput type="password" name="password" label="Password" />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          endIcon={<IoIosLogIn />}
          sx={{
            mt: 2,
            bgcolor: "#DB1313",
            '&:hover': {
              bgcolor: "#A31010",
              
            },
          }}
        >
          Login
        </Button>
        <Typography
          variant="body2"
          textAlign="center"
          color="white"
          mt={2}
        >
          Don't have an account?{' '}
          <Box component="span" sx={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => navigate('/signup')}>
            Sign Up instead.
          </Box>
        </Typography>
      </form>
    </Box>
  </Box>
</Box>

  );
};

export default Login;