import React,{useState, useEffect}  from 'react';

export const CreateFilm = (props) =>{
    const [form, setForm] = useState({
        name: '',
        release: '',
        format: '',
        stars: [],
        inputsRenderingArray:[]
    })
    useEffect(()=>{
        window.M.updateTextFields()
    })
    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value })
    }

    return(
        <div className="films" style={{padding: 10}}>
            <div className="row">
                <form className="col s12">
                    <div className="row">
                        <div className="input-field ">
                            <input
                                placeholder="Название фильма"
                                id="name"
                                name="name"
                                type="text"
                                value={form.name}
                                onChange={changeHandler}
                            />
                            <label>Название фильма</label>
                        </div>
                        <div className="input-field">
                            <input
                                placeholder="Дата релиза фильма"
                                id="release"
                                name="release"
                                type="text"
                                value={form.release}
                                onChange={changeHandler}
                            />
                            <label>Дата релиза</label>
                        </div>
                        <div className="input-field">
                            <input
                                placeholder="Формат"
                                id="format"
                                name="format"
                                type="text"
                                value={form.format}
                                onChange={changeHandler}
                            />
                            <label>Формат</label>
                        </div>
                        <div className="input-field">
                            <input
                                placeholder="Актеры"
                                id="stars"
                                name="stars"
                                type="text"
                                value={form.stars}
                                onChange={changeHandler}
                            />
                            <label>Актеры</label>
                        </div>

                    </div>
                    <button className="btn blue"
                            onClick={()=> props.onChange(form)}
                    >Сохранить</button>
                </form>
            </div>
        </div>
    )
}
