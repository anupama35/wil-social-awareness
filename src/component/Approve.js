import React, { useState, useEffect } from 'react';

import Axios from "axios";

function Approve() {

    const [postList, setPostlist] = useState([]);
	
	useEffect(() => {
        Axios.get("https://wil-social-awareness.herokuapp.com/api/unapprovedPosts").then((response) => {
            console.log(response);   
            setPostlist(response.data);
        });
    }, []);

    const approvePost = (postId, event) => {
          
        if(window.confirm("Do you want to approve this post?")) {
            Axios.post("https://wil-social-awareness.herokuapp.com/api/approvePost", {
                postId: postId,  
            }).then((response) => {      
                if(response.data.error) {
                    console.log(response.data.error);
                } else {                      
                    alert("Successfully approved");
                    window.location.reload(false);
                }

             });
        }
    
        
    };
    

	return (
		<div>
			<h2>Approve Posts</h2>

            <table>
              <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>User</th>
                    <th></th>
                </tr>
              </thead>
              <tbody>
                
                {postList.map(post => 
                    <tr>
                        <th>{ post.title }</th>
                        <th>{ post.description }</th>
                        <th>{ post.username }</th>
                        <th><button className= "add_adv_btn" onClick = { (event) => approvePost(post.cmid, event) }>Approve</button></th>
                    </tr>
                )}
              </tbody>
            </table>
		</div>
	);
}
export default Approve;