import React, { useEffect, useState } from "react"
import "./movie.css"
import { useParams } from "react-router-dom"
import fetchOttDetails from "../../../components/SearchBar/ott"
import { ReactComponent as AppleIcon } from '../../../assets/icons/apple-tv-plus.svg'
import { ReactComponent as GoogleplayIcon } from '../../../assets/icons/googleplay.svg'
import { ReactComponent as AmazonIcon } from '../../../assets/icons/amazon_prime.svg'
import { ReactComponent as YoutubeIcon } from '../../../assets/icons/new-youtube-logo.svg'
import { ReactComponent as AhaIcon } from '../../../assets/icons/aha.svg'
import { ReactComponent as crunchyIcon } from '../../../assets/icons/crunchyroll.svg'
import { ReactComponent as DisneyIcon} from '../../../assets/icons/disney plus.svg'
import { ReactComponent as HotstarIcon} from '../../../assets/icons/disney+hotstar.svg'
import { ReactComponent as ErosNowIcon} from '../../../assets/icons/eros-now.svg'
import { ReactComponent as HboMaxIcon} from '../../../assets/icons/hbo-max-logo.svg'
import { ReactComponent as HuluIcon} from '../../../assets/icons/hulu.svg'
import { ReactComponent as JioCinemaIcon} from '../../../assets/icons/jio-cinema.svg'
import { ReactComponent as NetflixIcon} from '../../../assets/icons/netflix.svg'
import { ReactComponent as ParamountIcon} from '../../../assets/icons/paramount.svg'
import SunNxtIcon from '../../../assets/icons/sunnxt.png';
import TataIcon from '../../../assets/icons/tata sky.png';
import { ReactComponent as VootIcon} from '../../../assets/icons/Voot.svg'
import { ReactComponent as Zee5Icon} from '../../../assets/icons/zee5-seeklogo.svg'
import { ReactComponent as MicrosoftIcon} from '../../../assets/icons/microsoft.svg'
import { ReactComponent as DirectvIcon} from '../../../assets/icons/directv.svg'
import SonyLivIcon from '../../../assets/icons/sony_liv.png';

const Movie = () => {
    const [currentMovieDetail, setMovie] = useState()
    const [ottData, setOttData] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        getData()
        window.scrollTo(0, 0)
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

    const getPlatformIcon = (platformName) => {
        if (!platformName) return null;
        
        switch (platformName.toLowerCase()) {
            case 'aha': return <AhaIcon className="platform-icon" />;
            case 'amazon prime':
            case 'amazonprimevideo':
            case 'amazon': return <AmazonIcon className="platform-icon" />;
            case 'apple tv':
            case 'itunes':
            case 'apple-tv-plus': return <AppleIcon className="platform-icon" />;
            case 'crunchyroll': return <crunchyIcon className="platform-icon" />;
            case 'disneyplus':
            case 'disney+': return <DisneyIcon className="platform-icon" />;
            case 'hotstar':
            case 'disney+hotstar': return <HotstarIcon className="platform-icon" />;
            case 'eros now':
            case 'eros-now': return <ErosNowIcon className="platform-icon" />;
            case 'google play':
            case 'googleplay':
            case 'play': return <GoogleplayIcon className="platform-icon" />;
            case 'hbo max':
            case 'hbo-max': return <HboMaxIcon className="platform-icon" />;
            case 'hulu': return <HuluIcon className="platform-icon" />;
            case 'jio cinema':
            case 'jio-cinema': return <JioCinemaIcon className="platform-icon" />;
            case 'netflix': return <NetflixIcon className="platform-icon" />;
            case 'youtube': return <YoutubeIcon className="platform-icon" />;
            case 'paramount':
            case 'paramount+': return <ParamountIcon className="platform-icon" />;
            case 'sony liv':
            case 'sony_liv': return <img src={SonyLivIcon} alt="Sony Liv" className="platform-icon" />;
            case 'sun nxt':
            case 'sunnxt': return <img src={SunNxtIcon} alt="Sun NXT" className="platform-icon" />;
            case 'tatasky': return <img src={TataIcon} alt="Tata play" className="platform-icon" />;
            case 'voot': return <VootIcon className="platform-icon" />;
            case 'zee5': return <Zee5Icon className="platform-icon" />;
            case 'microsoft': return <MicrosoftIcon className="platform-icon" />;
            case 'directv': return <DirectvIcon className="platform-icon" />;
            default: return null;
        }
    }

    const renderPlatforms = (platforms) => {
        if (!platforms || !Array.isArray(platforms) || platforms.length === 0) return null;
        return (
            <div className="platform-list">
                {platforms.map((platform, index) => {
                    const icon = getPlatformIcon(platform.platform);
                    return (
                        <a key={index} href={platform.url} className="platform-link">
                            {icon ? icon : <span>{platform.platform}</span>}
                        </a>
                    );
                })}
            </div>
        );
    }

    const renderCountrySection = (country, name) => {
        const platforms = ottData?.streamingAvailability?.country?.[country];
        if (!platforms || platforms.length === 0) return null;
        return (
            <div className="country-section">
                <h3>{name}</h3>
                {renderPlatforms(platforms)}
            </div>
        );
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
                </div>
            </div>
            
            <div className="movie__ottContainer">
                <div className="movie__ottPlatforms">
                    <div className="ottPlatformsText">Available on</div>
                    <div className="ottPlatformsList">
                        {ottData && ottData.streamingAvailability && ottData.streamingAvailability.country ? (
                            <div className="country-platforms">
                                {renderCountrySection('IN', 'India (IN)')}
                                {renderCountrySection('US', 'United States (US)')}
                            </div>
                        ) : (
                            <p>No streaming data available</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="movie__links">
                {
                    currentMovieDetail && currentMovieDetail.homepage && <a href={currentMovieDetail.homepage} style={{textDecoration: "none"}}><p><span className="movie__homeButton movie__Button">Homepage <i className="newTab fas fa-external-link-alt"></i></span></p></a>
                }
                {
                    currentMovieDetail && currentMovieDetail.imdb_id && <a href={"https://www.imdb.com/title/" + currentMovieDetail.imdb_id} style={{textDecoration: "none"}}><p><span className="movie__imdbButton movie__Button">IMDb<i className="newTab fas fa-external-link-alt"></i></span></p></a>
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