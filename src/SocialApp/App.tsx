import React from 'react'
import { useState, useEffect } from "react";


const URL = "https://pivot-backend-n1u5.onrender.com/";


export default function App() {
 const [profiles, setProfiles] = useState([]);
 const [username, setUsername] = useState("");
 const [password, setPassword] = useState("");
 const [loginData, setLoginData] = useState(null);
 const [name, setName] = useState("");
 const [image, setImage] = useState("");
 const [description, setDescription] = useState("");


 async function getAllProfiles() {
   try {
     const response = await fetch(URL + 'profiles');
     if (!response.ok) {
       throw new Error(`HTTP error! Status: ${response.status}`);
     }
     const data = await response.json();
     // return profiles;
     setProfiles(data);


   } catch (error) {
     console.error('Failed to fetch profiles:', error);
     return [];
   }
 }


 const authFunction = async (auth) => {
   try {
     const response = await fetch(URL + `auth/${auth}`, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({ username, password }),
     });


     if (response.ok) {
       const data = await response.json();
       setLoginData(data)
     } else {
       const errorData = await response.json();
       console.log(errorData.message)
     }
   } catch (error) {
     console.error("Error registering user:", error);
     alert("Something went wrong!");
   }
 };


 const createProfile = async () => {
   try {
     const response = await fetch("https://pivot-backend-n1u5.onrender.com/profiles", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({
         name,
         image,
         description,
         ownerId: loginData.id
       }),
     });


     if (response.ok) {
       alert("Profile created!");
       setName("");
       setImage("");
       setDescription("");
     } else {
       const errorData = await response.json();
       alert("Failed to create profile: " + errorData.message);
     }
   } catch (error) {
     console.error("Error creating profile:", error);
     alert("Something went wrong.");
   }
 };


 useEffect(() => {
   getAllProfiles()
 }, [])


 return (
   <div>
     <h3>{loginData?.username}</h3>
     {/* GET */}
     <h1>All Profiles</h1>
     {profiles.map(profile => (
       <div key={profile.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
         <h2>{profile.name}</h2>
         <img
           src={profile.image}
           alt={profile.name}
           style={{ width: '150px', height: '150px', objectFit: 'cover' }}
         />
         <p>{profile.description}</p>
         <p>Comments: {profile.commentCount}</p>
       </div>
     ))}
     {!loginData?.id ? (
       <div className="p-4 max-w-sm mx-auto space-y-4">
         <h1 className="text-xl font-bold">Register/Login</h1>
         <input
           className="w-full border p-2"
           placeholder="Username"
           value={username}
           onChange={(e) => setUsername(e.target.value)}
         />
         <input
           className="w-full border p-2"
           type="password"
           placeholder="Password"
           value={password}
           onChange={(e) => setPassword(e.target.value)}
         />
         <button
           className="bg-blue-500 text-white px-4 py-2 rounded"
           onClick={() => authFunction("register")}
         >
           Register
         </button>
         <button
           className="bg-blue-500 text-white px-4 py-2 rounded"
           onClick={() => authFunction("login")}
         >
           Login
         </button>
       </div>
     ) : (
       <div className="max-w-md mx-auto p-4 bg-white rounded-xl shadow-md space-y-4">
         <h2 className="text-2xl font-bold text-center text-gray-800">Create Profile</h2>
         <input
           className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
           placeholder="Name"
           value={name}
           onChange={(e) => setName(e.target.value)}
         />


         <input
           className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
           placeholder="Image URL"
           value={image}
           onChange={(e) => setImage(e.target.value)}
         />


         <textarea
           className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
           placeholder="Description"
           value={description}
           onChange={(e) => setDescription(e.target.value)}
         />


         <button
           className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
           onClick={createProfile}
         >
           Submit
         </button>
       </div>


     )}
   </div>
 )
}
