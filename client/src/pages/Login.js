import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    username: '',
    email: '',
    password: '',
    otp: ''
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(60);
  const [isOtpExpired, setOtpExpired] = useState(false);
  const [otpMessage, setOtpMessage] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    let timer;
    if (otpSent && otpTimer > 0) {
      timer = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    } else if (otpTimer === 0) {
      setOtpExpired(true);
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [otpSent, otpTimer]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Request Payload:', {
      email: input.email,
      password: input.password,
      username: input.username 
    });

    if (isRegistered) {
      try {
        const res = await axios.post('https://checkdeploye.onrender.com/api/v1/user/register', {
          username: input.username,
          email: input.email,
          password: input.password
        });
        setOtpMessage(res.data.message);
        setIsRegistered(false); 
      } catch (error) {
        console.error('Registration Error:', error.response); 
        setOtpMessage(error.response.data.message || "Error during registration.");
      }
    } else {
    
      try {
        const res = await axios.post('https://checkdeploye.onrender.com/api/v1/user/login', {
          email: input.email,
          password: input.password
        });
        setOtpSent(true); 
        setOtpExpired(false);
        setOtpTimer(60);
        setOtpMessage("OTP Sent.Please Enter The OTP.");
      } catch (error) {
        console.error('Login Error:', error.response);
        setOtpMessage(error.response.data.message || "Error during login.");
      }
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    if (isOtpExpired) {
      alert("OTP has expired. Please request a new one.");
      return;
    }
  
    if (!input.email || !input.otp) {
      setOtpMessage("Please enter your email and OTP.");
      return;
    }
  
    try {
      console.log("Verifying OTP for email:", input.email, "and OTP:", input.otp);
      const res = await axios.post('https://checkdeploye.onrender.com/api/v1/user/verify-otp', {
        email: input.email,
        otp: input.otp
      });
  
      console.log("OTP verification response:", res);
  
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('username', res.data.name);
        navigate('/'); 
      } else {
        setOtpMessage("OTP verification failed. Please try again.");
      }
    } catch (error) {
      console.error('OTP Verification Error:', error);
  
      if (error.response && error.response.data) {
        setOtpMessage(error.response.data.message || "Error during OTP verification.");
      } else {
        setOtpMessage("An unexpected error occurred. Please try again.");
      }
    }
  };
  

  return (
    <div className="container shadow rounded my-5 p-4" style={{ maxWidth: '500px' }}>
    <h2 className="text-center mb-4 fw-bold">Login Here</h2>
    <form onSubmit={otpSent ? handleOtpVerification : handleSubmit}>
      {isRegistered && (
        <div className="mb-4">
          <label htmlFor="username" className="form-label fw-semibold">Username</label>
          <input
            type="text"
            name="username"
            value={input.username}
            onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
            className="form-control"
            id="username"
            placeholder="Enter Username"
            required
          />
        </div>
      )}
      <div className="mb-4">
        <label htmlFor="email" className="form-label fw-semibold">Email</label>
        <input
          type="email"
          name="email"
          value={input.email}
          onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
          className="form-control"
          id="email"
          placeholder="Enter Email"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="form-label fw-semibold">Password</label>
        <input
          type="password"
          name="password"
          value={input.password}
          onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
          className="form-control"
          id="password"
          placeholder="Enter Password"
          required
        />
      </div>
  
      {otpSent && (
        <div className="mb-4">
          <label htmlFor="otp" className="form-label fw-semibold">Enter OTP</label>
          <input
            type="text"
            name="otp"
            value={input.otp}
            onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
            className="form-control"
            id="otp"
            placeholder="Enter OTP"
            required
          />
          <small className={`d-block mt-2 ${otpTimer > 0 ? 'text-muted' : 'text-danger'}`}>
            {otpTimer > 0 ? `OTP valid for ${otpTimer} seconds` : 'OTP expired. Request a new one.'}
          </small>
        </div>
      )}
  
      <button
        type="submit"
        className="btn btn-primary w-100 py-2 fw-semibold"
        disabled={otpSent && otpTimer === 0}
      >
        {otpSent ? 'Verify OTP' : isRegistered ? 'Register' : 'Login'}
      </button>
  
      {otpMessage && (
        <div className="alert alert-info mt-4 mb-0" role="alert">
          {otpMessage}
        </div>
      )}
    </form>
  </div>
  
  );
};

export default Login;