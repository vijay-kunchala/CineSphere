import React, { useEffect, useState } from "react"
import "./movie.css"
import { useParams } from "react-router-dom"
import fetchOttDetails from "../../../components/SearchBar/ott"

const Movie = () => {
    const [currentMovieDetail, setMovie] = useState()
    const [ottData, setOttData] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        getData()
        window.scrollTo(0,0)
    }, [])

    const getData = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
            const data = await response.json()
            setMovie(data)

            if (data.imdb_id) {
                const ottDetails = await fetchOttDetails(data.imdb_id)
                setOttData(ottDetails)
            }
        } catch (error) {
            console.error("Error fetching movie data:", error)
        }
    }

    return (
        <div className="movie">
            <div className="movie__intro">
                <img className="movie__backdrop" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.backdrop_path : ""}`} />
            </div>
            <div className="movie__detail">
                <div className="movie__detailLeft">
                    <div className="movie__posterBox">
                        <img className="movie__poster" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.poster_path : ""}`} />
                    </div>
                </div>
                <div className="movie__detailRight">
                    <div className="movie__detailRightTop">
                        <div className="movie__name">{currentMovieDetail ? currentMovieDetail.original_title : ""}</div>
                        <div className="movie__tagline">{currentMovieDetail ? currentMovieDetail.tagline : ""}</div>
                        <div className="movie__rating">
                            {currentMovieDetail ? currentMovieDetail.vote_average: ""} <i className="fas fa-star" />
                            <span className="movie__voteCount">{currentMovieDetail ? "(" + currentMovieDetail.vote_count + ") votes" : ""}</span>
                        </div>  
                        <div className="movie__runtime">{currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}</div>
                        <div className="movie__releaseDate">{currentMovieDetail ? "Release date: " + currentMovieDetail.release_date : ""}</div>
                        <div className="movie__genres">
                            {
                                currentMovieDetail && currentMovieDetail.genres
                                ? 
                                currentMovieDetail.genres.map(genre => (
                                    <><span className="movie__genre" id={genre.id}>{genre.name}</span></>
                                )) 
                                : 
                                ""
                            }
                        </div>
                    </div>
                    <div className="movie__detailRightBottom">
                        <div className="synopsisText">Synopsis</div>
                        <div>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
                    </div>
                    
                    {/* OTT Platforms Section */}
<div className="movie__ottPlatforms">
    <div className="ottPlatformsText">Available on</div>
    <div className="ottPlatformsList">
        {ottData && ottData.streamingAvailability && ottData.streamingAvailability.country ? (
            <>
                <h3>India (IN)</h3>
                <ul>
                    {ottData.streamingAvailability.country.IN.map((platform, index) => (
                        <li key={index}>
                            <a href={platform.url} rel="noopener noreferrer">
                                {platform.platform.charAt(0).toUpperCase() + platform.platform.slice(1)}
                            </a>
                        </li>
                    ))}
                </ul>
                <h3>United States (US)</h3>
                <ul>
                    {ottData.streamingAvailability.country.US.map((platform, index) => (
                        <li key={index}>
                            <a href={platform.url} rel="noopener noreferrer">
                                {platform.platform.charAt(0).toUpperCase() + platform.platform.slice(1)}
                            </a>
                        </li>
                    ))}
                </ul>
            </>
        ) : (
            <p>No streaming data available</p>
        )}
    </div>
</div>
                </div>
            </div>
            <div className="movie__links">
                <div className="movie__heading">Useful Links</div>
                {
                    currentMovieDetail && currentMovieDetail.homepage && <a href={currentMovieDetail.homepage} target="_blank" style={{textDecoration: "none"}}><p><span className="movie__homeButton movie__Button">Homepage <i className="newTab fas fa-external-link-alt"></i></span></p></a>
                }
                {
                    currentMovieDetail && currentMovieDetail.imdb_id && <a href={"https://www.imdb.com/title/" + currentMovieDetail.imdb_id} target="_blank" style={{textDecoration: "none"}}><p><span className="movie__imdbButton movie__Button">IMDb<i className="newTab fas fa-external-link-alt"></i></span></p></a>
                }
            </div>
            <div className="movie__heading">Production companies</div>
            <div className="movie__production">
                {
                    currentMovieDetail && currentMovieDetail.production_companies && currentMovieDetail.production_companies.map(company => (
                        <>
                            {
                                company.logo_path 
                                && 
                                <span className="productionCompanyImage">
                                    <img className="movie__productionComapany" src={"https://image.tmdb.org/t/p/original" + company.logo_path} />
                                    <span>{company.name}</span>
                                </span>
                            }
                        </>
                    ))
                }
            </div>
        </div>
    )
}

export default Movie