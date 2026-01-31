# 🏥 Healthcare Appointment Management System

A **full-stack** web application for booking and managing healthcare appointments, featuring a modern React frontend and a robust Spring Boot backend. This project streamlines doctor discovery, appointment scheduling, and patient management for clinics and hospitals.

---

## 🚀 Features

### Frontend (React)
- 👤 **Patient Portal**: Register, login, and manage appointments
- 🩺 **Doctor Directory**: Browse, filter, and view detailed doctor profiles
- 📅 **Appointment Booking**: Select available days and time slots, book instantly
- 📋 **My Appointments**: View, cancel, and track appointment status
- 📬 **Contact & Support**: Integrated contact form and location map
- 📱 **Responsive UI**: Fully mobile-friendly and visually appealing
- 📴 **Offline Demo Data**: Fallback to demo data if backend is unavailable

### Backend (Spring Boot)
- 🔐 **User Authentication**: Register/login for patients and doctors, JWT-based security
- 🗓️ **Appointment Management**: Book, view, and cancel appointments
- 👨‍⚕️ **Doctor Management**: Admins register doctors; users view profiles and availability
- 📧 **Email Notifications**: Confirmation for appointments and contact forms
- ☁️ **Cloudinary Integration**: Doctor profile images
- 🛡️ **Role-based Access**: Admin, Doctor, and Patient roles

---

## 🛠️ Tech Stack

- **Frontend**: React 19, React Router DOM 7, Vite, CSS Modules, FontAwesome
- **Backend**: Java 21, Spring Boot 3, Spring Data JPA, Hibernate, MySQL, Spring Security, JWT, Cloudinary, Email (SMTP)
- **Linting**: ESLint (React Hooks, Vite plugins)
- **Deployment**: GitHub Pages (frontend)

---

## 📁 Project Structure

```
frontend/
  src/
    components/      # Reusable UI components (Navbar, Footer, DoctorCard, etc.)
    pages/           # Main app pages (Home, About, Doctors, Contact, Auth, etc.)
    data/            # Demo data for doctors and appointments
    hooks/           # Custom React hooks
    utils/           # Utility functions (date formatting, etc.)
    assets/          # Images and icons
  public/
    logo.png         # App logo
  index.html         # Main HTML file
  vite.config.js     # Vite configuration
  eslint.config.js   # ESLint configuration
backend/
  controller/        # REST API endpoints (auth, appointments, doctors, contact)
  service/           # Business logic (auth, appointments, doctors, email)
  model/             # JPA entities (User, Doctor, Patient, Appointment, etc.)
  repository/        # Spring Data repositories
  dto/               # Data transfer objects
  exception/         # Custom exception handling
  config/            # Configuration classes
  security/          # JWT utilities
  src/main/resources/application.properties # Config
  pom.xml            # Maven build file
```

---

## 🖥️ Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm
- Java 21
- MySQL

### Frontend Setup
```bash
# Clone and install
cd frontend
npm install

# Run locally
npm run dev
# Visit http://localhost:5173

# Build for production
npm run build

# Lint
npm run lint

# Deploy to GitHub Pages
npm run deploy
```

### Backend Setup
```bash
# Configure MySQL and Cloudinary in application.properties
# Build & Run
./mvnw spring-boot:run

# Run tests
./mvnw test
```

---

## 🌐 API Endpoints (Backend)
- `POST   /auth/register` — Register patient
- `POST   /auth/admin/register-doctor` — Register doctor (admin only)
- `POST   /auth/login` — Login
- `POST   /appointments` — Book appointment
- `GET    /appointments/patient/{patientId}` — View patient appointments
- `PUT    /appointments/{appointmentId}/cancel` — Cancel appointment
- `GET    /doctors/list` — List all doctors
- `GET    /doctors/{id}` — Doctor profile
- `GET    /doctors/{doctorId}/availability` — Doctor availability
- `POST   /contact-form` — Send contact message

---

## 🌱 Environment
- The frontend expects a backend running at `http://localhost:8080` for live data.
- If the backend is unavailable, demo data is used for doctors and appointments.
- Backend requires MySQL, SMTP, and Cloudinary credentials in `application.properties`.

---

## 👨‍💻 Author
- **Jasphin Vijay**
    - [GitHub](https://github.com/JasphinVijayJ)
    - [LinkedIn](https://www.linkedin.com/in/jasphin-vijay)
    - [Portfolio](https://jasphinvijayj.github.io/Portfolio/)

---

## 📄 License
This project is for educational/demo purposes.

---
