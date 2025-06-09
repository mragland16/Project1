import React, { useState, useEffect } from 'react'; // Import useEffect
// import "./App.css"; // Commented out as per your code; uncomment if you use it for global styles
import Lottie from "lottie-react";
import CatLottie from "../assets/cat_1.json";

// Assuming CatImages is a component you might use later, but it's not used in this file
// import CatImages from "./Components/CatImages"; 

export default function CatApp() { // Component names should start with a capital letter (PascalCase)
    const [isLoading, setIsLoading] = useState(false);
    const [catImage, setCatImage] = useState(null);
    const [catText, setCatText] = useState(null);
    const [whatCatSays, setWhatCatSays] = useState("");
    const [enterSite, setEnterSite] = useState(false);
    const [catFact, setCatFact] = useState(""); // Renamed for consistent casing

    // This useEffect will run whenever catImage changes.
    // It's a good place to set isLoading to false after the image URL is received.
    useEffect(() => {
        if (catImage) {
            setIsLoading(false);
        }
    }, [catImage]);

    const fetchData = async () => {
        setIsLoading(true); // Start loading
        setCatImage(null); // Clear previous image while loading
        try {
            const response = await fetch("https://cataas.com/cat?json=true");
            if (!response.ok) { // Always check if the response was successful
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            // The URL from cataas.com/cat?json=true is relative, so you need to prepend the base URL
            setCatImage(`https://cataas.com${data.url}`);
        } catch (error) {
            alert(`Error fetching cat image: ${error.message}`);
            setIsLoading(false); // Make sure loading state is reset on error
        }
        // No need for setIsLoading(false) here if using useEffect to track catImage
    };

    const fetchCatText = async () => { // Changed to async/await for consistency and better error handling
        if (!whatCatSays.trim()) { // Check if input is empty or just whitespace
            alert("Please type something for the cat to say!");
            return;
        }
        setIsLoading(true); // Start loading
        setCatText(null); // Clear previous cat text image
        try {
            // Correct API endpoint for text: https://cataas.com/cat/says/:text
            const response = await fetch(`https://cataas.com/cat/says/${encodeURIComponent(whatCatSays.trim())}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            setCatText(response.url); // The image is at the response.url
        } catch (error) {
            alert(`Error fetching cat text: ${error.message}`);
        } finally {
            setIsLoading(false); // Always stop loading, whether success or error
        }
    };

    const enterHandler = () => {
        setEnterSite(true);
        // Optionally, fetch a cat fact when entering the site for the first time
        fetchCatFacts(); 
    };

    const fetchCatFacts = async () => {
        setIsLoading(true); // Start loading
        setCatFact(""); // Clear previous fact
        try {
            // Correct API endpoint for cat facts
            const response = await fetch("https://catfact.ninja/fact?max_length=140"); 
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setCatFact(data.fact);
        } catch (error) {
            alert(`Error fetching cat fact: ${error.message}`);
        } finally {
            setIsLoading(false); // Always stop loading, whether success or error
        }
    };

    // --- Conditional Rendering for Welcome Screen ---
    if (enterSite === false) { // Use strict equality (===)
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-100 to-pink-100 p-4">
                <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">Welcome to my Cat App!</h2>
                {/* Removed semicolon here */}
                <Lottie className="h-64 w-64 md:h-96 md:w-96 rounded-full overflow-hidden shadow-lg" animationData={CatLottie} loop={true} /> 
                <button 
                    className="mt-8 px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75" 
                    onClick={enterHandler}
                    disabled={isLoading} // Disable button while loading
                >
                    Enter
                </button>
                
                <h3 className="text-2xl font-semibold text-gray-700 mt-12 mb-4 text-center">Random Cat Fact:</h3>
                {catFact ? (
                    <p className="text-lg text-gray-600 italic max-w-md text-center">"{catFact}"</p>
                ) : (
                    <p className="text-lg text-gray-500 italic max-w-md text-center">Loading a purr-fect fact...</p>
                )}
                <button 
                    className="mt-4 px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75" 
                    onClick={fetchCatFacts}
                    disabled={isLoading} // Disable button while loading
                >
                    Get Another Fact
                </button>
            </div>
        );
    }

    // --- Main App Screen ---
    return (
        <div className="Main p-6 bg-gradient-to-br from-blue-100 to-green-100 min-h-screen flex flex-col items-center">
            <h1 className="text-5xl font-extrabold text-blue-800 mb-4 animate-bounce">Cat App!</h1>
            <p className="text-xl text-gray-700 mb-6 text-center">Press the button to rescue a cat!</p>
            
            <button 
                onClick={fetchData}
                className="px-8 py-4 bg-orange-500 text-white font-bold text-lg rounded-full shadow-lg hover:bg-orange-600 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-75"
                disabled={isLoading} // Disable button while loading
            >
                {isLoading ? "Loading..." : "Meow!"}
            </button>

            {/* Conditionally render image only when catImage is available */}
            {catImage && (
                <img
                    src={catImage}
                    alt="Cute cat"
                    className="mt-8 rounded-lg shadow-xl border-4 border-white max-w-full h-auto max-h-96 object-contain"
                />
            )}

            <p className="text-xl text-gray-700 mt-10 mb-4 text-center">What do you want the cat to say?</p>
            <input
                type="text"
                value={whatCatSays}
                onChange={(e) => setWhatCatSays(e.target.value)}
                placeholder="Enter text for the cat..."
                className="p-3 border-2 border-gray-300 rounded-lg w-full max-w-md text-lg focus:outline-none focus:border-purple-500 shadow-sm"
            />
            
            {/* Removed addItem button - it was not defined */}
            {/* <button onClick={addItem}>Add Item</button> */} 

            <button 
                onClick={fetchCatText}
                className="mt-6 px-8 py-3 bg-green-500 text-white font-bold text-lg rounded-full shadow-lg hover:bg-green-600 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
                disabled={isLoading} // Disable button while loading
            >
                {isLoading ? "Loading..." : "Cat Says!"}
            </button>

            {/* Conditionally render cat text image only when catText is available */}
            {catText && (
                <img
                    src={catText}
                    alt="Cat with text"
                    className="mt-8 rounded-lg shadow-xl border-4 border-white max-w-full h-auto max-h-96 object-contain"
                />
            )}
        </div>
    );
}