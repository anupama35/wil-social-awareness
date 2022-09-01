import React, { useState } from 'react';

import Axios from "axios";

function Advertisement() {

	const [title, setTitle] = useState('');
	const [image, setImage] = useState(null);

	const postAdvertisement = () => {

		const formData = new FormData();
		formData.append('image', image);
		formData.append('title', title);
		const config = {
			headers: {
				'content-type': 'multipart/form-data',
			},
		};

		Axios.post("https://wil-social-awareness.herokuapp.com/api/postAdvertisement", formData, config).then((response) => {
			if(response.data.error) {
                    console.log(response.data.error); 
					alert("Error, Please try again!");
                    
            } else {                      
                alert("Successfully posted");
                    
            }  
			//window.location.reload(false);
		});

	};

	return (
		<div className= "form-style">
			<h2>Post Advertisement</h2>
			<ul>
				<li>
					<input type="text" name="field1" class="field-style field-full align-none" placeholder="Advertisement Title" onChange={(e) => {
                                    setTitle(e.target.value)
                                }}/>
					
				</li>
				<li>
				<input type="file" name="image" accept='image/*' onChange={(e) => {
                                    setImage(e.target.files[0])
                                }}/>
				</li>
				<li>
				<input type="submit" className="btn sign-in-btn" onClick = { postAdvertisement } value="Post" />
				</li>
				</ul>
		</div>
	);
}

export default Advertisement;