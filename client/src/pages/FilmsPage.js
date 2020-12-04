import React, {useEffect, useCallback, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {Loader} from "../components/Loader";
import {ListFilms} from "../components/ListFilms";
import {useParams} from 'react-router-dom'
import {SearchFilm} from "../components/SearchFilm";

export const FilmsPage  = () => {

    let filterId = useParams().id
    let idActor = useParams().idActor
    let nameFilm  = useParams().name
    let nameActor  = useParams().nameActor

    useEffect(()=>{
        window.M.updateTextFields()
    })
    const [films, setFilms] = useState([])
    const {loading, request} = useHttp()

    const fetchFilms = useCallback( async () =>{
        try {
            console.log(filterId, idActor ,nameFilm ,nameActor)

            if(filterId){
                const filmsDB = await request (`/api/film/filter/${filterId}`, "GET", null)
                setFilms(filmsDB)
            }
            else if (idActor){
                const filmsDB = await request (`/api/film/actor/${idActor}`, "GET", null)
                setFilms(filmsDB)
            }
            else if (nameActor){
                const filmsDB = await request (`/api/film/actor/n/${nameActor}`, "GET", null)
                setFilms(filmsDB)
            }
            else if (nameFilm){
                const filmsDB = await request (`/api/film/${nameFilm}`, "GET",  null)
                let filmsSearch = [];
                filmsSearch.push(filmsDB)
                setFilms(filmsSearch)
            }
            else {
                const filmsDB = await request( `api/film/all`, 'GET', null)
                setFilms(filmsDB)
            }
        }
        catch (e){
        }
    }, [request, setFilms,filterId, idActor, nameFilm, nameActor])


    useEffect(() =>{
        fetchFilms()
    },[fetchFilms])

    if(loading){
        return <Loader/>
    }

    return(
        <>
            <SearchFilm/>
            <div>
            {!loading && films &&<ListFilms films = {films}  />}
            </div>
        </>
   )
}
