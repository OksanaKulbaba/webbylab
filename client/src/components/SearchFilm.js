import React, {useState} from 'react';
import {Link} from "react-router-dom";

export const SearchFilm = () =>{
    const [film, setNameFilm] = useState(
        {nameFilm:'',
                  nameActor:''  })
    const changeHandler = (event) =>{
        setNameFilm({ ...film, [event.target.name]: event.target.value })

    }

    return (
        <div className='row offset-s2' style={{paddingTop: 30}} >
                <div className='input field' style={{display: 'flex', justifyContent: 'spaceBetween'}}>
                    <input type="text"
                           className="form-control"
                           placeholder="Search by movie title"
                           id='searchFilm'
                           name ="nameFilm"
                           value={film.nameFilm}
                           onChange={changeHandler}
                    />

                    <Link to={`/film/${film.nameFilm}`}>
                        <button type="submit"
                                className="btn blue"
                        > Search </button>
                    </Link>
                </div>

            <div className='input field' style={{display: 'flex', justifyContent: 'spaceBetween'}}>
                <input type="text"
                       className="form-control"
                       placeholder="Search by star"
                       id='searchActor'
                       name ="nameActor"
                       value={film.nameActor}
                       onChange={changeHandler}
                />

                <Link to={`/film/actorname/${film.nameActor}`}>
                    <button type="submit"
                            className="btn blue"
                    > Search </button>
                </Link>
            </div>
        </div>


    )
}
