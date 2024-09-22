import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from "./store/authslice";
import Navbar from"./components/Navbar"
import Footer from"./components/Footer"
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.userData?.email); // Get email from userData
  const navigate=useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      if (!email) {
        dispatch(logout());
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/current-user', {
          params: { email },
          withCredentials: true, // Include credentials if needed
        });

        const userData = response.data;

        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
          navigate("/login");
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [dispatch, email]);

  return !loading ? (
   <div>
      <Navbar/>
      <main>
      <Outlet/>
      </main>
      
      <Footer/>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default App;
