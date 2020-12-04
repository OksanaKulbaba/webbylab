import React, {useState, useCallback, useEffect} from 'react';
import {useHttp} from "../hooks/http.hook";
import {LoadFile} from "../components/LoadFile";
import {CreateFilm} from "../components/CreateFilm";
import {Loader} from "../components/Loader";
import axios from "axios";

export const AddFilmsPage  = () => {

    const [form, setForm] = useState({
        name: '',
        release: '',
        format: '',
        stars: [],
    })

    const {loading, request} = useHttp()
    const saveHandler = useCallback( async(form) =>{
        try {
          const response  =  await axios.post('/api/film/add',  {...form})
            console.log("SaveFile")
            alert(response.data)
        }
        catch (e){}
    }, [form, request])

    useEffect(()=>{
        saveHandler()
    }, [saveHandler])

    if(loading){
        return <Loader />
    }
    return(
        <>
            <CreateFilm  onChange = {saveHandler} />
            <LoadFile/>
        </>
    )
}
