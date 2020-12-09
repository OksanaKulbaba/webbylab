import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from  'react-router-dom'
import {useHttp} from "../hooks/http.hook";
import {Loader} from "./Loader";

export const DellFilm  = () => {
    const {loading, request } = useHttp()
    const [film, setFilm] = useState()
    const filmName = useParams().id

    const dellFilm = useCallback(async ()=>{
        try {
            const fetched = await request (`/api/film/${filmName}`, "DELETE", null)
            setFilm(fetched)
        }
        catch (e) {
        }
    },[request,filmName])

    useEffect(()=>{
        dellFilm()
    }, [dellFilm])

    if(loading){
        return <Loader />
    }
    return(
        <>
          <h2>  {filmName} movie was deleted</h2>
        </>
    )
}
