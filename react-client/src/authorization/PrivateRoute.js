// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import React from 'react';
import AuthService from '../services/AuthService';

import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const auth = AuthService.isLoggedIn();

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return auth ? <Outlet /> : <Navigate to="/redirect" />;
}
  
  export default PrivateRoute;