import React from 'react'

const MovieList = (props) => {
    const Nominee = props.nomineeComponent

    return (
        <>
            {props.movies.map((movie, index) => (
                <div className="movie col-sm image-container d-flex justify-content-center align-items-center rounded">
                    <img className='img ml-1 mr-1 shadow' src={movie.Poster} alt={movie.Title}></img>
                    <div className="movie-info overlay d-flex align-items-center justify-content-between flex-column" onClick={() => props.handleNomineeClick(movie)}>
                        <h6>{movie.Title} ({movie.Year})</h6>
                        <Nominee />
                    </div>
                </div>
            ))}
        </>
    )
}

export default MovieList
