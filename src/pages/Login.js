import React, { useState } from 'react';
import Axios from "axios";
import { Link, useNavigate } from 'react-router-dom';


import logo from '../img/Social_Awareness_logo.jpeg';

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState('');

    const navigate = useNavigate();
     
   
    const login = () => {
        Axios.post("https://wil-social-awareness.herokuapp.com/api/login", {
            username: username, 
            password: password, 
        }).then((response) => {      
            if(response.data.error) {
                setLoginStatus(response.data.error);
            } else {                      
                alert("Successfully logged in");
                navigate("/");
                //window.location.reload(false);
            }

         });
         
    };
	
	return (
        <div className="d-flex just-center items-center h-100 w-100">
		    <div className="d-flex login-window">
                <div className="col-50 login-types-wrapper d-flex just-center items-center">
                    <div className="login-types">
                        <img src={logo} alt="Logo" />
                    </div>
                </div>

                <div className="col-50 login-fields-wrapper d-flex just-center items-center">
                    <div className="login-fields">
                        <h2>Log In</h2>
                        <h2 className="error">{ loginStatus } </h2>
                        <div className="login_form">
                            <label htmlFor="user_id">Username</label>
                          <input 
                            id="user_id"
                            type="text"
                            placeholder="Username" onChange={(e) => {
                            setUsername(e.target.value)
                            }} />
                          <label htmlFor="user_password">Password</label>
                          <input
                            id="user_password"
                            type="password"
                            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" onChange={(e) => {
                            setPassword(e.target.value)
                            }} 
                          />
                          <button className="btn sign-in-btn" onClick={login}>LOG IN</button>
                        </div>
                        <div className="d-flex space-between login-help">
                          <span><button className= "link" >Forgot password?</button></span>
                          <span><Link className= "link" to="/register">Not a Member?</Link></span>                          
                        </div>
                    </div>
                </div>
            </div>
        </div>
	);
}

export default Login;