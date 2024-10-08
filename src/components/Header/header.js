import React, { useState } from "react"
import "./header.css"
import { Link, useNavigate } from "react-router-dom"
import  HeaderIcon from '../../assets/icons/logo 2.svg'

const Header = () => {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const executeSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search?query=${encodeURIComponent(query.trim())}`);
        }
    };

    const resetSearch = () => {
        setQuery("");
    };

    return (
        <div className="header">
            <div className="headerLeft">
                <Link to="/"><img className="header__icon" src={HeaderIcon} alt="Logo" /></Link>
                <Link to="/movies/popular" style={{textDecoration: "none"}}><span>Popular</span></Link>
                <Link to="/movies/top_rated" style={{textDecoration: "none"}}><span>Top Rated</span></Link>
                <Link to="/movies/upcoming" style={{textDecoration: "none"}}><span>Upcoming</span></Link>
            </div>

            <div className="headerRight">
                <form className="search-box" onSubmit={executeSearch}>
                    <input 
                        type="text" 
                        value={query}
                        onChange={handleInputChange}
                        placeholder=" "
                    />
                    <button type="reset" onClick={resetSearch}></button>
                </form>
            </div>
        </div>
    )
}

export default Header