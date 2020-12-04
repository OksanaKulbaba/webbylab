import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from  'react-router-dom'
import {useHttp} from "../hooks/http.hook";
import {Loader} from "../components/Loader";
import {FilmCard} from "../components/FilmCard";

export const DetailPage  = () => {
    const {loading, request } = useHttp()
    const [film, setFilm] = useState()
    const filmName = useParams().id

    const getFilm = useCallback(async ()=>{
        try {
             const fetched = await request (`/api/film/${filmName}`, "GET", null)
             setFilm(fetched)
        }
        catch (e) {
        }
    },[request,filmName])



    useEffect(()=>{
        getFilm()
    }, [getFilm])

    if(loading){
        return <Loader />
    }
    return(
        <>
            {!loading && film && <FilmCard film = {film}  />}
        </>
        )
}
