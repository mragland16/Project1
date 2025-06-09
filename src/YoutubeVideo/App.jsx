import React from "react"
import "./App.css"
import Search from "./Components/Search.jsx"
import { useEffect, useState } from "react"
import Spinner from "./Components/Spinner.jsx"
import MovieCard from "./Components/MovieCard.jsx"
import { useDebounce } from 'react-use';


const API_BASE_URL = `https://api.themoviedb.org/3`;

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;


const API_OPTIONS = {
    method: "GET",
    headers: {
        // the api will send back the adjacent object aka javascript object
        accept: 'application/json',
        // who is trying to make the request
        Authorization: `Bearer ${API_KEY}`




    }
}

export default function App() {
    const [searchTerm, setSearchTerm] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [movieList, setMovieList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState();

    const fetchMovies = async (query = "") => {
        setIsLoading(true);
        setErrorMessage("")

        try {
            const endpoint = searchTerm
                ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
                : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

            // fetch is built in js function that allows u to make 
            // http request , gets data from api to disply on websites
            const response = await fetch(endpoint, API_OPTIONS);
            // if the response isn't ok
            if (!response.ok) {
                throw new Error("failed to fetch movies");
            }
            // if the response is ok
            const data = await response.json();

            if (data.Response === "false") {
                setErrorMessage(data.Error || "failed to fetch movies");
                setMovieList([]);
                return;

            }

            setMovieList(data.results || []);

        } catch (error) {
            console.log(`Error fetching movies: ${error}`);
            setErrorMessage("Error fetching movies. Please try again later.");
        } finally {
            setIsLoading(false);

        }


    }

     // Debounce the search term to prevent making too many API requests
  // by waiting for the user to stop typing for 500ms
    useDebounce(() => setDebouncedSearchTerm(searchTerm), 3000, [searchTerm]);


    useEffect(() => {
        fetchMovies(debouncedSearchTerm);
    }, [debouncedSearchTerm]);



    return (
        <main>
            <div className="pattern" />

            <div className="wrapper">

                <header>


                    <img src="/hero.png" alt="Hero background" />
                    <h1>Find <span className="text-gradient">Movies</span>You'll Enjoy Without The Hassle</h1>



                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </header>

                <section className="all-movies">
                    <h2 className="mt-[40px]">All Movies</h2>

                    {isLoading ? (
                        <Spinner/>
                    ) : errorMessage ? (
                        <p className="text-red-500"> {errorMessage}</p>
                    ) : (

                        <ul>
                            {movieList.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </ul>
                    )}
                </section>


                )

                )
            </div>



        </main>


    )


}