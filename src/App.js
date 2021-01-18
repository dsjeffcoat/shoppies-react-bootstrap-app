import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieList from './components/MovieList'
import './App.css'
import Heading from './components/Heading';
import Search from './components/Search';
import AddNominee from './components/AddNominee'
import RemoveNominee from './components/RemoveNominee'

function App() {
  const [movies, setMovies] = useState([])
  const [nominees, setNominees] = useState([])
  const [searchValue, setSearchValue] = useState('')

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?apikey=711fa2f8&type=movie&s=${searchValue}`

    const response = await fetch(url);
    const responseJson = await response.json();

    // console.log(responseJson)
    if(responseJson.Search) {
      setMovies(responseJson.Search)
    }
  }

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const nominees = JSON.parse(localStorage.getItem('shoppies-nominees'))

    setNominees(nominees)
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem('shoppies-nominees', JSON.stringify(items))
  }

  const addNominee = (movie) => {
    const nomineeList = [...nominees, movie]
    if (nomineeList.length > 5) {
      alert('You have chosen all of your nominees! Thank you!!!')
    } else {
      setNominees(nomineeList)
      saveToLocalStorage(nomineeList)
    }
  }

  const removeNominee = (movie) => {
    const nomineeList = nominees.filter((nominee) => nominee.imdbID !== movie.imdbID)

    setNominees(nomineeList)
    saveToLocalStorage(nomineeList)
  }

  return (
    <div className='container-fluid shoppies-front'>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <Heading heading="The Shoppies"/>
        <Search searchValue={searchValue} setSearchValue={setSearchValue}/>
      </div>
      
      <div className='row pt-5 pb-5'>
        <MovieList movies={movies} handleNomineeClick={addNominee} nomineeComponent={AddNominee} />
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <Heading heading="Your Nominations"/>
      </div>
      
      <div className='row'>
        <MovieList movies={nominees} handleNomineeClick={removeNominee} nomineeComponent={RemoveNominee} />
      </div>
    </div>
  );
}

export default App;
