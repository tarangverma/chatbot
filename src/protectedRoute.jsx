import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ component: Component }) {
  const isLoggedIn = localStorage.getItem('token');
  console.log("isLoggedIn", isLoggedIn, Component)

  return <Component />;
}

export default ProtectedRoute;
