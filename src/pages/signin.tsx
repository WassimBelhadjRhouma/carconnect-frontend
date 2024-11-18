import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService"; // Import API service
import { Link } from 'react-router-dom';
import { LoginRequest, LoginResponse } from "../types/api";
import axios, { AxiosError } from "axios";
const SignIn: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [formData, setFormData] = useState<LoginRequest>({
      email: "",
      password: "",
    });
    const navigate = useNavigate();
  



      // Handle input changes
  const handleChange = (event:any) => {
    const { name, value } = event.target; // Destructure name and value from the event
    setFormData((prevData) => ({
      ...prevData, // Preserve other form data
      [name]: value, // Update the specific field
    }));
  };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault(); // Prevent page reload
  
      const requestData: LoginRequest = formData;
  
      console.log(requestData);
      axios
      .post("http://localhost:8080/api/auth/login", requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // Handle success
        console.log("Response data:", response.data);
    
        // Save token to localStorage
        localStorage.setItem("authToken", response.data.token);
    
        // Navigate to the dashboard
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        
        // Handle error
        const errorMessage =
          err.response?.data?.message || "Login failed. Please try again.";
        console.error("Error during login:", errorMessage);
    
        // Set error message
        setError(errorMessage);
      });
    };
   return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div className="flex min-h-full h-screen flex-1">
        
        <div  className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <p
                className="flex logo"
              >CarConnect.</p>    
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
            
              <h2 className="mt-10 text-2xl/9 font-bold tracking-tight text-gray-900">Hi there!</h2>
              <p className="mt-2 text-sm/6 text-gray-500">
                Welcome to your carconnect
              </p>
            </div>

            <div className="mt-10">
              <div>
                <form onSubmit={handleSubmit}  className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        value={formData.email} // Controlled input
                        onChange={handleChange} // Detect changes
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                      Password
                    </label>
                    <div className="mt-2">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        autoComplete="current-password"
                        value={formData.password} // Controlled input
                        onChange={handleChange} // Detect changes
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

{/* forget password part */}
                  {/* <div className="flex items-center justify-between">
                    <div className="flex items-center">
                    
                    </div>

                    <div className="text-sm/6">
                      <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Forgot password?
                      </a>
                    </div>
                  </div> */}

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-indigo-600 mt-9 mb-3 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Sign in
                    </button>
                    <p className="mt-2 text-sm/6 text-gray-500">
                    Don’t have an account?{' '}
                <Link to='/signup' className="font-semibold text-indigo-600 hover:text-indigo-500">
                  sign up
                </Link>
              </p>
                  </div>
                </form>
              </div>

            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            alt=""
            src="https://plus.unsplash.com/premium_photo-1681965893732-0c6bf9f0841e?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="absolute inset-0 size-full object-cover"
          />
        </div>
      </div>
    </>
  )
};

export default SignIn;