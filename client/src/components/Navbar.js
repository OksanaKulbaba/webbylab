import React  from 'react'
import {NavLink} from "react-router-dom";


export const Navbar = () => {

    return (
        <nav>
            <div className="nav-wrapper blue" style={{padding: '0 2rem'}}>
                <span  className="brand-logo">FILMS</span>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/all">All films</NavLink></li>
                    <li><NavLink to="/newFilm">Add new film</NavLink></li>
                    <li><NavLink to="/loadFilm">Load file</NavLink></li>
                </ul>
            </div>
        </nav>
    )

}
