  // import React from 'react'
  import './App.css';
  import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

  // Page
  import Login from './pages/Login';
  import Register from './pages/Register';

  // Route
  
  // Middleware
  import checkAuth from './app/auth';
  import Layouts from './container/layouts';


  function App() { 
    const token = checkAuth();

    return (
      <>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Private */}
            <Route path="/app/*" element={<Layouts />} />
            <Route path="*" element={<Navigate to={token ? "app/dashboard" : "/login"} replace />}/>
          </Routes>
        </Router>
      </>
    )
  }

  export default App
