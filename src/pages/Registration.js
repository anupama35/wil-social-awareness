import React, { useState } from 'react';
import '../App.css';
import Axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

import logo from '../img/Social_Awareness_logo.jpeg';

function Registration() {
	
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const register = () => {
    Axios.post("https://wil-social-awareness.herokuapp.com/api/register", {
      username: username, 
      password: password, 
      email: email,
    }).then(() => {
      alert("Successfully registered");
      navigate('/login');
    }).catch(error => {
      console.log(error.response);
    });
  };

	return (
		<div className="d-flex just-center items-center h-100 w-100">
            <div className="d-flex login-window">
                <div className="col-40 login-types-wrapper d-flex just-center items-center">
                     <div className="login-types">
                        <img src={logo} alt="Logo" />
                     </div>
                </div>
                <div className="col-50 login-fields-wrapper d-flex just-center items-center">
                    <div className="login-fields">
                        <h2>Register Yourself</h2>
                        <div className="login_form">
                            <label htmlFor="user_id">User Name</label>
                            <input 
                              type="text"
                              placeholder="User Name" onChange={(e) => {
                                    setUsername(e.target.value)
                                }} />
                            <label htmlFor="user_id">Email</label>
                            <input 
                              type="email"
                              placeholder="Example@gmail.com" onChange={(e) => {
                                    setEmail(e.target.value)
                                }}/>
                            <label htmlFor="user_password">Password</label>
                            <input
                              id="user_password"
                              type="password"
                              placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" onChange={(e) => {
                                    setPassword(e.target.value)
                                }} 
                            />
                            <label htmlFor="confirm-user-password">Confirm Password</label>
                            <input
                            id="confirm-user-password"
                            type="password"
                            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                            />
                            <button className="btn sign-in-btn" onClick={register}>REGISTER</button>
                        </div>
                        <div className="d-flex just-end login-help">
                            <span><Link className= "link" to="/login">Already have account?</Link></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
	);
}

export default Registration;