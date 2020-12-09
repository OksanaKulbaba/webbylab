import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';

export const LoadFile  = () => {

    const [file, setFile] = useState('')

    const onFile = useCallback(async () => {
       const formData = new FormData();
       formData.append('file', file);
       const response =  await axios.post('/api/film/load', formData)
        if (response.status===400){console.log('400!!!!!!!')}
       alert(JSON.stringify(response.data))

    },[file])

   const onFileChange = (e) =>{
       const fileInner = e.target.files[0];
       setFile(fileInner)
   }
   const submittedFile = (e) =>{
       e.preventDefault()
        onFile()
       setFile('')
   }


    return(
        <div >
            <h2 style={{color:'#2196F3'}}>
                Download file:
            </h2>
        <form>
            <table>
                <tbody>
                <tr>
                    <td>
                       Select a file to download:
                    </td>
                </tr>
                <tr>
                    <td>
                    <input  onChange={onFileChange} type="file"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input  type="submit" value="Загрузить"
                                className="btn blue"
                                onClick={submittedFile }/>
                    </td>
                </tr>
                </tbody>
            </table>
        </form>
        </div>

    )
}
