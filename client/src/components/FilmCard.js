import React from 'react';
import {Link} from 'react-router-dom'
export const FilmCard  = (film) => {

    return (
        <div className="row">
            <div className="col s12">
                <div className="card">
                    <div className="card-content">
                       <span className="card-title">Title:</span>
                          <h1 >
                            {film.film.name}
                          </h1>
                     <div className="card-content" >

                        <div> Release {film.film.release}</div>
                        <div> Format {film.film.format}</div>

                        <table>
                            <thead>
                            <tr>
                                <th>Stars:</th>
                                <th>Other films:</th>
                            </tr>
                            </thead>
                            <tbody>
                            {film.film.stars.map(actor =>{
                                return (
                                    <tr key = {actor._id}>
                                        <td>{actor.firstName} {actor.lastName}</td>
                                        <td>
                                             <Link to={`/film/actor/${actor._id}`}>
                                                <button type="button"
                                                        className="btn blue"> Open </button>
                                             </Link>
                                        </td>
                                    </tr>)
                            })}
                            </tbody>
                        </table>
                     </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
