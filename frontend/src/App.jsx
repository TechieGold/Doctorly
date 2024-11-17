import { Route, Routes } from "react-router-dom"
import Home from "./Pages/Home"
import About from "./Pages/About"
import Contact from "./Pages/Contact"
import MyAppointments from "./Pages/MyAppointments"
import Doctors from "./Pages/Doctors"
import Profile from "./Pages/Profile"
import Login from "./Pages/Login"
import Appointment from "./Pages/Appointment"
import Navbar from "./Components/Navbar"
import Footer from "./Components/Footer"

function App() {
 
  return (
    <div className="mx-4 sm:mx-[10%]">
       <Navbar />
       
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/my-appointments" element={<MyAppointments/>} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/appointment/:docId" element={<Appointment/>} />

      </Routes>
      <Footer />
    </div>
  )
}

export default App
