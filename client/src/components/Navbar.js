import React  from 'react'
import {NavLink} from "react-router-dom";


export const Navbar = () => {

    return (
        <nav>
            <div className="nav-wrapper blue" style={{padding: '0 2rem'}}>
                <span  className="brand-logo">Информация о фильмах</span>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/all">Все фильмы</NavLink></li>
                    <li><NavLink to="/newFilm">Добать новый фильм</NavLink></li>
                    <li><NavLink to="/actors">Все актеры</NavLink></li>
                </ul>
            </div>
        </nav>
    )

}
