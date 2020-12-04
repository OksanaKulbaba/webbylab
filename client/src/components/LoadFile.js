import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';

export const LoadFile  = () => {

    const [file, setFile] = useState('')

const onFile = useCallback(async () => {
       const formData = new FormData();
       formData.append('file', file);
      const response =  await axios.post('/api/film/load', formData)
       alert(response.data)

    },[file])

   const onFileChange = (e) =>{
       const fileInner = e.target.files[0];
       setFile(fileInner)
   }

   useEffect(() =>{
    onFile()}
   , [onFile])

    return(
        <div>
        <form>
            <table>
                <tbody>
                <tr>
                    <td>Select File :</td>
                </tr>
                <tr>
                    <td>
                    <input onChange={onFileChange} type="file"/>
                    </td>
                </tr>
                </tbody>
            </table>
        </form>
        </div>

    )
}
