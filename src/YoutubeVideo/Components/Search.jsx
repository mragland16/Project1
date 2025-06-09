import React from 'react'

const Search = ({searchTerm, setSearchTerm}) => {



  return (


    <div className="search">

<div>

  <img src="search.svg" alt="search"/>
  <input
  type="text"
  placeholder="Search Through thousands of movies"
  value={searchTerm}
  onChange={(event)=>setSearchTerm(event.target.value)}

  />
</div>

    </div>
    // <div className= "text-white text 3xl">{props.searchTerm}</div>
  )
}

export default Search