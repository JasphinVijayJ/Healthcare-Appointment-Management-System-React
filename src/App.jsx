import { Route, Routes, Navigate } from 'react-router-dom'
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
import MyProfile from './pages/Patient/MyProfile/MyProfile'
import DoctorLayout from './components/Navbar/DoctorLayout'
import { PatientRoute, ProtectedRoute, PublicRoute } from './pages/Auth/RouteGuards'
import Dashboard from './pages/Doctor/Dashboard/Dashboard'


// Toastify
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
    <>
      <ToastContainer />

      <ScrollArrow />
      <ScrollToTop />

      <Routes>

        {/* Patient routes */}
        <Route path='/*' element={
          <PatientRoute>
            <Navbar />

            <Routes>
              {/* Public routes - accessible to everyone */}
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/doctors' element={<Doctor />} />
              <Route path='/doctor-profile/:doctorId' element={<DoctorProfile />} />
              <Route path='/contact' element={<Contact />} />

              {/* Auth routes */}
              <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
              <Route path='/register' element={<PublicRoute><Register /></PublicRoute>} />

              {/* Patient-only routes */}
              <Route path='/my-profile' element={
                <ProtectedRoute allowedRoles={['PATIENT']}>
                  <MyProfile />
                </ProtectedRoute>} />

              <Route path='/my-appointments' element={
                <ProtectedRoute allowedRoles={['PATIENT']}>
                  <MyAppointments />
                </ProtectedRoute>} />

              {/* Catch-All Route */}
              <Route path='*' element={<Navigate to="/" replace />} />

            </Routes>

            <Footer />
          </PatientRoute>
        } />

        {/* Doctor routes */}
        <Route path="/doctor/*" element={
          <ProtectedRoute allowedRoles={['DOCTOR']}>
            <DoctorLayout />
          </ProtectedRoute>
        }>
          <Route path='dashboard' element={<Dashboard />} />

          {/* Catch-All Route */}
          <Route path='*' element={<Navigate to="/doctor/dashboard" replace />} />

        </Route>

      </Routes>
    </>
  )
}

export default App
