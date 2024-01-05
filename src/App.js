import './App.css';
import Login from './Pages/Login/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './Pages/Dashboard/Dashboard';
import Trainees from './Pages/Trainees/Trainees';
import Training from './Pages/Training/Training';
import Admin from './Pages/Admin/Admin';
import Edit from './Pages/Edit/Edit';
import SideBar from './Components/SideBar/SideBar';
import NavBar from './Components/NavBar/NavBar';
import { PageLayout } from './Layouts/PageLayout';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  function Protected({ children }) {
    if (!isLoggedIn) {
      return <Navigate to="/login" replace />;
    }
    return children;
  }

  return (
    <div className="App">
      
      <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

          <Route path="/" element={<PageLayout />}>
            <Route
              path="/"
              element={
                <Protected>
                  <Dashboard />
                </Protected>
              }
            />
            <Route
              path="/trainees"
              element={
                <Protected>
                  <Trainees />
                </Protected>
              }
            />
            <Route
              path="/training"
              element={
                <Protected>
                  <Training />
                </Protected>
              }
            />
            <Route
              path="/admin"
              element={
                <Protected>
                  <Admin />
                </Protected>
              }
            />
            <Route
              path="/edit"
              element={
                <Protected>
                  <Edit />
                </Protected>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
