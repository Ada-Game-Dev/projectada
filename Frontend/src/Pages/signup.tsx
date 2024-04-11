import React, { useEffect } from "react";
import { IoIosLogIn } from "react-icons/io";
import { Box, Typography, Button } from "@mui/material";
import CustomizedInput from "../Components/Shared/customizedinput";
import { toast } from "react-hot-toast";
import { useAuth } from "../Context/authcontext";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      toast.loading("Signing Up", { id: "signup" });
      await auth?.signup(name, email, password);
      toast.success("Signed Up Successfully", { id: "signup" });
    } catch (error) {
      console.log(error);
      toast.error("Signing Up Failed", { id: "signup" });
    }
  };
  useEffect(() => {
    if (auth?.user) {
      return navigate("/chat");
    }
  }, [auth]);
  return (
    <Box width={"100vw"} height={"100vh"} display="flex">
  {/* Left Side with Illustration */}
  <Box bgcolor={'#DB1313'} flex={1} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
    <Box 
      component="img"
      src="..\AdaIllustration.svg"
      alt="Gamer"
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
  
  {/* Right Side with Signup Form */}
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
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit}>
        <CustomizedInput type="text" name="name" label="Name" />
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
          Signup
        </Button>
        <Typography
          variant="body2"
          textAlign="center"
          color="white"
          mt={2}
        >
          Already have an account?{' '}
          <Box component="span" sx={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => navigate('/login')}>
            Log In instead.
          </Box>
        </Typography>
      </form>
    </Box>
  </Box>
</Box>

  );
};

export default Signup;