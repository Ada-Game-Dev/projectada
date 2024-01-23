import Header from "./Components/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/home";
import Login from "./Pages/login";
import Signup from "./Pages/signup";
import Chat from "./Pages/chat";
import NotFound from "./Pages/notfound";
import { useAuth } from "./Context/authcontext";
import Footer from "./Components/Footer/footer";
function App() {
  const auth = useAuth();

  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {auth?.isLoggedIn && auth.user && (
          <Route path="/chat" element={<Chat />} />
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default App;