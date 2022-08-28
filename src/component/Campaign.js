import React, { useState } from 'react';

import Axios from "axios";

function Campaign() {

	const [title, setTitle] = useState('');
	const [description, setdescription] = useState('');
	const [imageName, setImageName] = useState('');
	const [image, setImage] = useState(null);

	const postCampaign = () => {

		const formData = new FormData();
		formData.append('image', image);
		formData.append('title', title);
		formData.append('description', description);
		const config = {
			headers: {
				'content-type': 'multipart/form-data',
			},
		};

		Axios.post("https://wil-social-awareness.herokuapp.com/api/postCampaign", formData, config).then((response) => {
			if(response.data.error) {
                    console.log(response.data.error); 
					alert("Error, Please try again!");
                    
                } else {                      
                    alert("Your post has been submitted for approval.");
                    
                }  
				window.location.reload(false);
		});

	};

	return (
		<div className= "form-style">
			<h2>Post Campaign</h2>
			<ul>
				<li>
					<input type="text" name="title" className="field-style field-full align-none" placeholder="Campaign Title" onChange={(e) => {
                                    setTitle(e.target.value)
                                }}/>
					
				</li>				
				<li>
				<textarea name="description" className="field-style" placeholder="Description" onChange={(e) => {
                                    setdescription(e.target.value)
                                }}></textarea>
				</li>
				<li>
				<input type="file" name="image" accept='image/*' onChange={(e) => {
                                    setImage(e.target.files[0])
                                }}/>
				</li>
				<li>
				<input type="submit" className="btn sign-in-btn" onClick = { postCampaign } value="Post" />
				</li>
				</ul>
		</div>
	);
}

export default Campaign;