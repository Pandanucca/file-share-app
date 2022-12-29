import React, { Component, useState } from 'react';
import axios from 'axios';

function FileUpload(props) {

    const [file, setFile] = useState([]);
    const [url, setUrl] = useState(props.serverUrl);
    const fileChange = (e) => {

        console.log("file change", url);
        setFile(e.target.files[0]);
    }
    const uploadFile = (e) => {
        //e.target
        const data = new FormData();
        data.append('file', file);
        console.log("server url", url);
        const endpoint = url + "upload";
        console.log("endpoint", endpoint)
        axios.post(endpoint, data)
            .then((res) => {
                console.log(res.statusText);
            });
    }
    return (
        <div className="App">
            <header className="App-header">



                <h1>File upload</h1>

                <div className='App'>
                    <input type='file' name='file' onChange={fileChange} />
                    <button className='btn btn-secondary' onClick={uploadFile}>Upload</button>
                </div>

            </header>
        </div>
    );
}


export default FileUpload;