import React, {useState, useEffect, useCallback} from 'react';
import {useHttp} from "../hooks/http.hook";
import axios from "axios";
import {Loader} from "./Loader";
import Select from 'react-select'
import YearPicker from "react-year-picker";


export const CreateFilm = () =>{
    const [form, setForm] = useState({
        name: '',
        release: '',
        format: '',
        stars: []
    })

    const format = [
        { value: 'DVD', label: 'DVD' },
        { value: 'Blu-Ray', label: 'Blu-Ray' },
        { value: 'VHS', label: 'VHS' }
    ]

   useEffect(()=>{
        window.M.updateTextFields()
    })

    const {loading} = useHttp()
    const saveHandler = useCallback( async() =>{
        try {
            const response  =  await axios.post('/api/film/add',  {...form})
            alert(JSON.stringify(response.data))
        }
        catch (e){}
    }, [form])

    if(loading){
        return <Loader />
    }

    const submitHandler = event =>{
        event.preventDefault()
        saveHandler();
        setForm({
            name: '',
            release: '',
            format: '',
            stars: []
        })
    }

    const changeHandler = event => {
       event.preventDefault()
       setForm({...form, [event.target.name]: event.target.value })
    }
    const changeHandlerFormat = (selectedFormat)  => {
        console.log(selectedFormat)
        setForm({...form, format: selectedFormat.value})
    }
    const changeHandlerRelease = (selectedYears)  => {
        setForm({...form, release: selectedYears})
    }



    return(
        <div className="films" style={{
            position: 'relative',
            padding: 10}}>
            <div className="row" >
                <form className="col s12">
                    <div className="row">
                        <h2 style={{color:'#2196F3'}}>
                            Save film:
                        </h2>
                        <div className="input-field">
                            <input
                                placeholder="movie titles"
                                id="name"
                                name="name"
                                type="text"
                                value={form.name}
                                onChange={changeHandler}
                            />
                            <label>Movie titles</label>
                        </div>

                        <label>Movie format</label>
                        <div>
                            <Select
                                id='format'
                                placeholder={form.format}
                                value={form.format}
                                onChange={changeHandlerFormat}
                                options={format}/>
                        </div>
                        <label>Release date</label>
                        <div >
                            <YearPicker
                                style={{display: 'flex',
                                height: 10}}
                                id="release"
                                name="release"
                                value={form.release}
                                onChange={changeHandlerRelease}/>
                        </div>
                        <div className="input-field">
                            <input

                                placeholder="Stars"
                                id="stars"
                                name="stars"
                                type="text"
                                value={form.stars}
                                onChange={changeHandler}
                            />
                            <label>Stars</label>
                        </div>

                    </div>
                    <div style={{textAlign: 'center'}}>
                    <button

                            type="submit"
                            className="btn blue"
                            onClick={submitHandler}
                    >Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
