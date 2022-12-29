import React, { useEffect, useState } from 'react';

function Files(props) {
    const [files, setFiles] = useState([])
    const [searchedFiles, setSearchedFiles] = useState([]);
    const [isSearched, setIsSarched] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        console.log("files");
        loadFiles();

    }, [])
    const loadFiles = async () => {
        const data = await fetch(props.serverUrl + "files");
        const json = await data.json();
        setFiles(json);
        console.log("FILES", files);

    }
    const [searchInput, setSearchInput] = useState("");

    const handleChange = async (e) => {
        e.preventDefault();
        const val = e.target.value;
        setSearchInput(val);
    };
    const handleSearch = async (e) => {
        // const data = await fetch(props.serverUrl + "search/" + searchInput);
        // const json = await data.json();
        // if (json.length <= 0 || json === null || json === undefined) {
        //     setFiles([])
        // } else {
        //     setFiles(json);
        //     console.log("FILES", files);
        // }
        setIsSarched(true);
        const searchedFiles = files.filter(file => {
            console.log(file.filename)
            console.log(searchInput)
            console.log(file.filename == searchInput)
            return file.filename.includes(searchInput)
        })
        setSearchedFiles(searchedFiles)
    }
    const download = async (idx) => {
        const id = files[idx]._id;
        console.log("download", id);
        const winId = window.open(props.serverUrl + "file/" + id);
    }
    return (
        <div>


            <input
                type="text"
                placeholder="Search here"
                onChange={handleChange}
                value={searchInput} />
            <button className='btn btn-primary' onClick={handleSearch}>Search</button>
            {files.length < 1 ? <div>loading files</div> :
                <div>
                    {!isSearched && files.map((file, idx) => (
                        <p key={idx}><button className='btn btn-info' onClick={() => download(idx)}>
                            {file.filename}</button>
                        </p>
                    ))}
                    {isSearched && searchedFiles.map((file, idx) => (
                        <p key={idx}><button className='btn btn-info' onClick={() => download(idx)}>
                            {file.filename}</button>
                        </p>
                    ))}
                </div>}

        </div >
    )
}


export default Files;