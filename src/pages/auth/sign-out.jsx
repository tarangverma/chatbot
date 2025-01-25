import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function SignOut() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    navigate('/auth/sign-in');
  }, [navigate]);

  return null;
}

export default SignOut;
