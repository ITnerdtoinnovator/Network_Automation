import { Route, Routes } from "react-router-dom"
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Navbar from "./pages/Navbar";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import {ProtectedRoute, RedirectRoute, VerifyEmailRoute} from "./context/ProtectedRoutes";
import VerifyEmail from "./pages/VerifyEmail";
import { Toaster } from "react-hot-toast";
import Automation from "./pages/Automation.jsx";

function App() {

  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<RedirectRoute ><Login /></RedirectRoute>} />
      <Route path='/signup' element={<RedirectRoute ><Signup /></RedirectRoute>} />
      <Route path='/verify-email' element={<VerifyEmailRoute ><VerifyEmail /></VerifyEmailRoute>} />
      <Route path='/automation' element={<ProtectedRoute ><Automation /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    <Toaster />
    </>
  )
}

export default App