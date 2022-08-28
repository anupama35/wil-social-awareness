import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import Axios from "axios";

// import Swiper bundle d
  import Swiper from 'swiper/bundle';
  import 'swiper/css/bundle';



function Home() {

    const navigate = useNavigate();
    const [postList, setPostlist] = useState([]);
    const [advertisement, setAdvertisement] = useState([]);
	
	useEffect(() => {
        Axios.get("https://wil-social-awareness.herokuapp.com/api/approvedPosts", {
                        headers: {
                                  'Content-Type': 'multipart/form-data',
                                  }
                      }).then((response) => {
            console.log(response);   
            setPostlist(response.data);
        });

        Axios.get("https://wil-social-awareness.herokuapp.com/api/advertisements", {
                        headers: {
                                  'Content-Type': 'multipart/form-data',
                                  }
                      }).then((response) => {
            console.log(response);   
            setAdvertisement(response.data);
        });
    }, []);


    const checkUserLogin = (action) => {
        Axios.get("https://wil-social-awareness.herokuapp.com").then((response) => {
            if(response.data.user){
                if(action === 'campaign') {
                    navigate('/post_campaign');
                } else if(action === 'ad') {
                    navigate('/post_advertisement');
                }
            } else {
                alert("Please login to make a  post!");
                navigate('/login');
            }           
        });
    };

    const swiper = new Swiper('.swiper', {

        // Navigation arrows
        navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        },
    });
	
	return (
        <div className="page-content-container">
            <div className="container">
                <div className="d-flex space-between">        
                    <div className="timeline_container">
                      <div className="Popup_btns">
                        <button className= "add_adv_btn" onClick = { (event) => checkUserLogin("campaign", event) }>Post Campaign</button>
                        <button className= "add_adv_btn"  onClick = { (event) => checkUserLogin("ad", event) } >Post Advertisement</button>
                      </div>
                      <div className="timeline">
                        {postList.map(post =>
                            <div className="single_post">
                                <div className="user_meta d-flex items-center">                                    
                                    <p>{ post.title }</p>
                                </div>
                                <div className="post_description">
                                    <p>{ post.description }</p>
                                </div>
                                <div className="post_media">
                                    
                                    <img src= { 'https://wil-social-awareness.herokuapp.com/uploads/' + post.image_src } alt="Post Image"/>
                                </div>
                                <div>
                                    
                                    <p>Posted by: { post.username } </p>
                                </div>
                                  <div className="post_comments">
                                    <div className="user_meta d-flex items-center">
                                      
                                      <input type="text" className="new_comment" placeholder="Write new comment"/>
                                    </div> 
                                  </div>
                                
                            </div>
                        )}
                        
                      </div>
                    </div>
                    <div className="advertisements_container">
                      <div className="advertisements">
                        <h2 className="center">Advertisements</h2>
                        <div className="swiper advertisement_slider mySwiper">
                          <div className="swiper-wrapper">
                          {advertisement.map(ad =>
                            <div className="swiper-slide">
                              <img src={ 'https://wil-social-awareness.herokuapp.com/uploads/' + ad.image_src } alt= { ad.title} />
                            </div>  
                          )}
                          </div>
                          
                          <div class="swiper-button-prev"></div>
                          <div class="swiper-button-next"></div>
                        </div>
                      </div>
                      <div className="about-us-section">
                        <h2 className="center">About Us</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste soluta perferendis eius iusto vel illo repellat ducimus, aperiam doloribus. Dolores sequi culpa minima quam nobis repudiandae omnis tempore excepturi. Tenetur!</p>
                      </div>
                      <div className="contact-us-section">
                        <h2 className="center">Get In Touch</h2>
                        <p>Please contact us through the following email or phone number for further inquiry.</p>
                        <span>Call: <a href="tel:0145863695">014 586 3695</a></span><br/>
                        <span>E-mail: <a href="mailto:Social_awareness@gmail.com">Social_awareness@gmail.com</a></span>
                      </div>
                    </div>
                </div>
            </div>
        </div>
	);
}

export default Home;