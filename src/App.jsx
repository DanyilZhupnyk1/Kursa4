import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from './store/AuthPrivider';


import Header from "./components/Header";
import Footer from "./components/Footer";
import MainPage from './pages/MainPage';
import AuditoriumsPage from './pages/AuditoriumsPage';
import AuditoriumPage from './pages/AuditoriumPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage'
import TermsOfServicePage from "./pages/TermOfService";
import PrivacyPolicyPage from "./pages/PrivacyPage";



function App() {
  return (
    <AuthProvider>
      <div className="d-flex flex-column justify-content-between min-vh-100">
        <Router>
          <Header />
          <Routes>
            <Route path="/auditorium/:id" element={ <AuditoriumPage /> } />
            <Route path="/auditoriums" element={ <AuditoriumsPage /> } />
            <Route path="/login" element={ <LoginPage /> } />
            <Route path="/register" element={ <RegisterPage /> } />
            <Route path="/profile/:id" element={ <ProfilePage /> } />
            <Route path="/terms" element={ <TermsOfServicePage /> } />
            <Route path="/privacy" element={ <PrivacyPolicyPage /> } />
            <Route path="/" element={ <MainPage /> } />
            <Route path="*" element={ <MainPage /> } />
          </Routes>
          <Footer />
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
