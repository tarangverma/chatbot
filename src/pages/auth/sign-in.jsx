import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Avatar,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import {ENV_PROXY} from '@/configs/globalVariable'

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return emailRegex.test(email);
  };

  const handleChange = (e, field) => {
    const { value } = e.target;

    if (field === "email") {
      setEmail(value);
      if (!validateEmail(value)) {
        setEmailError("Invalid email format");
      } else {
        setEmailError("");
      }
    } else if (field === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!email || !password || emailError) {
      return;
    }
  
    try {
      console.log("ENV_PROXY", ENV_PROXY)

      const response = await axios.post(`${ENV_PROXY}/v1/user/login`, {
        email,
        password,
      });
  
      // Store the token in session storage
      const { token } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
  
      // Handle successful login here (e.g., navigate to another page)
      navigate("/chat")
    } catch (error) {
      console.log("error", error)
      // Handle login error here (e.g., display an error message)
      if (error.response && (error.response.status === 400 || error.response.status === 401)) {
        setErrorMessage("Invalid email or password");
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
  };
  

  return (
    <>
      <div className="absolute inset-0 z-0 h-full w-full" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
        <div className="flex justify-center">
          <img src="/img/logo_full.png" className="mt-10 w-36 h-36" />
        </div>            
        <CardBody className="flex flex-col gap-4">
          {errorMessage && (
              <div className="text-red-500 text-center mb-4">{errorMessage}</div>
          )}
          <Input
            type="email"
            label="Email"
            size="lg"
            value={email}
            onChange={(e) => handleChange(e, "email")}
            error={emailError}
          />
          <Input
            type="password"
            label="Password"
            size="lg"
            value={password}
            onChange={(e) => handleChange(e, "password")}
          />
        </CardBody>
        <CardFooter className="pt-0">
          <Button fullWidth onClick={handleSubmit}
           style={{ backgroundColor: "#8CFFA5", color: "#000000", fontWeight: 400, fontFamily: "Poppins", fontSize: "15px" }} >
            Log In
          </Button>
        </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default SignIn;
