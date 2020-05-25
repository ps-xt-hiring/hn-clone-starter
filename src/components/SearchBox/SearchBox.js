import React, { useEffect, useState } from 'react';
import './SearchBox.scss';
import debounce from 'lodash.debounce';
export default function Search(){
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(null);
    const searchString =debounce(value =>{
        setLoading(true);
        fetch('https://jsonplaceholder.typicode.com/comments?postId='+value)
        .then(response => response.json())
        .then(json => {setResult(json); setLoading(false)})
    },
        1000)
    const alertResult = (event)=>{
        console.log(event.target.value)
        alert('Selected: '+event.target.value)
    }

    return <div>
        <input type="text" onKeyUp={(event)=>searchString(event.target.value)} className={loading ? 'is-loading':null}/>
        {
        result.length > 0 || !loading 
        ? <ul style={{display:'flex', flexDirection:'column'}}>
            {result.map(result => <div className="list-item"><button value={result.email} onClick={alertResult}>{result.email}</button></div>)}
          </ul>
        : null
        }
    </div>
}