import React, { useState, useEffect } from 'react';
import { Home, Login, Registration, Contact }  from '../pages';
import { Advertisement, Campaign, Approve } from '../component';
import {
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";
import Axios from "axios";

import logo from '../img/Social_Awareness_logo.jpeg';
import userImg from '../img/user_img.jpg';

    
function Layout() {

    const [activeUser, setActiveuser] = useState('');
    const [loggedIn, setLoggedin] = useState('');
    const [userRole, setUserrole] = useState('');


    const navigate = useNavigate();
          

    Axios.defaults.withCredentials = true;
    useEffect(() => {
        Axios.get("https://wil-social-awareness.herokuapp.com", { withCredentials: true }).then((response) => {
            if(response.data.user){
                setLoggedin(response.data.loggedIn);
                setActiveuser(response.data.user[0].username);
                setUserrole(response.data.user[0].role)
            } else {
                setLoggedin(response.data.loggedIn);
            }           
        });
    }, []);

    
    const logout = () => {
        Axios.get("https://wil-social-awareness.herokuapp.com/api/logout").then((response) => {
            console.log("User Exit");
            navigate('/login');
            //window.location.reload(false);
        });
        
      };

      
	return (
        
            <div>			
		
                <header className="site-header">
                    <div className="container">
                        <div className="d-flex space-between items-center">
                        <img src={logo} alt="Logo" className="site-logo"/>
                        <p className="company-title">Social Awareness</p>                    
                        <nav className="site-navigation transition">
                            <ul className="d-flex no-style primary-menu">
                            <li className="list-item"><Link to="/">Home</Link></li>  
                            <li className="list-item"><Link to="/contact">Contact Us</Link></li>     
                            
                            { loggedIn === true &&
                             <li className="admin_profile list-item">
                                <img src={ userImg } alt="" className="user_img" />                    
                                <div className="profile_options_container">
                                  <div className="profile_options">
                                    <p className="user_name">{ activeUser}</p>
                                    <ul className="user_options no-style">
                                     
                                    { userRole === 'admin' &&
                                       <li className="option_item"><Link href="/approve">Approve posts</Link></li>  
                                    }
                                      <li className="option_item"><Link href="/profile">Edit My Profile</Link></li>                                  
                                      <li className="option_item"><Link className="link" onClick= {logout}>Log Out</Link></li>
                                    </ul>
                                  </div>
                                </div>
                              </li>
                            }
                            {loggedIn === false &&
                              <li> <Link to="/login">Login</Link> </li>
                            }
                            </ul>
                        
                        </nav>                       
                              
                        </div>
                    </div>    
                 </header>  

                 <Routes>
                    <Route path="/login" element = { <Login />}>                    
                    </Route>
                    <Route path="/register" element = { <Registration />}>                    
                    </Route>
                    <Route path="/" element = { <Home />}>                    
                    </Route>
                    <Route path="/contact" element = { <Contact />}>                    
                    </Route>
                    { loggedIn === true &&
                        <Route path="/post_advertisement" element = { <Advertisement />}>                    
                        </Route>
                    }
                    { loggedIn === true &&
                        <Route path="/post_campaign" element = { <Campaign />}>                    
                        </Route>
                    }
                    { (loggedIn === true && userRole === 'admin') &&
                        <Route path="/approve" element = { <Approve />}>                    
                        </Route>
                    
                    }
                    
                </Routes>

                 <footer className="site-footer">
                    <div className="container">
                        <span className="center">All Rights Reserved By Social Awareness | 2022</span>
                    </div>
                </footer>
            </div>
	);
}

export { Layout };