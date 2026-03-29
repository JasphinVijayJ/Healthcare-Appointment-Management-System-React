import { Route, Routes } from 'react-router-dom'
import './App.css'

import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Home from './pages/Patient/Home/Home'
import ScrollArrow from './components/common/ScrollArrow'
import ScrollToTop from './components/common/ScrollToTop'
import About from './pages/Patient/About/About'
import Doctor from './pages/Patient/Doctor/Doctor'
import DoctorProfile from './pages/Patient/DoctorProfile/DoctorProfile'
import Contact from './pages/Patient/Contact/Contact'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import MyAppointments from './pages/Patient/MyAppointments/MyAppointments'
import ProtectedRoute from './utils/ProtectedRoute'

function App() {

  return (
    <>
      <Navbar />
      <ScrollArrow />
      <ScrollToTop />

      <Routes>
        {/* Public routes - accessible to everyone */}
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/doctors' element={<Doctor />} />
        <Route path='/doctor-profile/:doctorId' element={<DoctorProfile />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        {/* Patient-only routes */}
        <Route path='/my-appointments/:patientId' element={
          <ProtectedRoute allowedRoles={['PATIENT']}>
            <MyAppointments />
          </ProtectedRoute>} />

      </Routes>

      <Footer />
    </>
  )
}

export default App
