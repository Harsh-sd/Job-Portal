import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AllJobs from"./components/AllJobs.jsx"
import CreateJob from "./components/CreateJob.jsx"
import Logout from "./components/Logout.jsx"
import CompanyListPage from './components/companyListPage.jsx';
import RegisterCompany from './components/RegisterCompany.jsx';
import { Provider } from 'react-redux'
import About from "./components/About"
import {  RouterProvider , createBrowserRouter } from "react-router-dom";
import store from './store/store.js';
import ProtectedRoute from '../src/AuthLayout.jsx'; // Import the ProtectedRoute
import ApplyJob from './components/ApplyJob.jsx';
import Applicants from './components/Applicants.jsx';
import JobPage from './components/JobPage.jsx';
import Job from './components/Job.jsx';
import EditJob from './components/EditJob.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
         
            <Home />
          
        ), //  Not Protecting Home route
      },
      
  {
    path: '/jobspage', // Route for the JobPage with dynamic ID
    element: (
      <ProtectedRoute >
        <JobPage />
      </ProtectedRoute>
    ), // The JobPage component
  },
      {
        path: "/about",
        element: (
          <ProtectedRoute >
            <About />
          </ProtectedRoute>
        ), // Protect About route
      },
      {
        path: "/signup",
        element: <Signup />, // Public route
      },
      {
        path: "/login",
        element: <Login />, // Public route
      },
      {
        path: "/all-jobs",
        element: (
          <ProtectedRoute>
            <AllJobs/>
          </ProtectedRoute>
        ), // Protect About route
      },
      {
      path:"/register-company",
      element:(
        <ProtectedRoute>
        <RegisterCompany/>
      </ProtectedRoute>
      )
    },
    
    {
      path:"/job/:id/applicants",
      element:(
        <ProtectedRoute>
        <Applicants/>
      </ProtectedRoute>
      )
    },
    {
      path:"/applyjob/:id",
      element:(
        <ProtectedRoute>
        <ApplyJob/>
      </ProtectedRoute>
      )
    },
      {
        
          path: "/create-job/:companyId", // :companyId defines a dynamic parameter
          element: (
          <ProtectedRoute>
            <CreateJob />
          </ProtectedRoute>
        ), // Protect About route
      },
      ,
      {
        path: "/company-list",
        element: (
          <ProtectedRoute>
           <CompanyListPage/>
          </ProtectedRoute>
        ), // Protect About route
      },
      {
        path: "/getjobbyid/:id",
        element: (
          <ProtectedRoute>
           <Job/>
          </ProtectedRoute>
        ), // Protect About route
      },
      
      {
        path: "/editjob/:id",
        element: (
          <ProtectedRoute>
           <EditJob/>
          </ProtectedRoute>
        ), 
      },
      
      {
        path: "/logout",
        element: (
          <ProtectedRoute >
             <Logout/>
          </ProtectedRoute>
           
          
        ), // Protect About route
      },

      
      
      
    ],
  },
]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
    
   
  </StrictMode>,
)
