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
import ProtectedRoute from './pages/Auth/ProtectedRoute'

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
        
        <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
        <Route path='/register' element={<PublicRoute><Register /></PublicRoute>} />

        {/* Patient-only routes */}
        <Route path='/my-appointments' element={
          <ProtectedRoute allowedRoles={['PATIENT']}>
            <MyAppointments />
          </ProtectedRoute>} />

      </Routes>

      <Footer />
    </>
  )
}

export default App


// Redirect logged-in users away from login/register pages
function PublicRoute({ children }) {

  const email = localStorage.getItem('email');
  const role = localStorage.getItem('role');

  if (email && role) {
    if (role === 'ADMIN') return <Navigate to="/admin/dashboard" replace />
    if (role === 'DOCTOR') return <Navigate to="/doctor/dashboard" replace />
    return <Navigate to="/" replace />
  }

  return children
}