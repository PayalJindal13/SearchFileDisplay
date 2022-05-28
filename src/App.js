import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import './table.css'
const fetch = require('cross-fetch')

function App() {
    const [data, setData] = useState('');
    useEffect(() => {
        fetch('DisplayFile.txt').then(response => response.json()).then((data) => setData(data))
    }, [])
    return ( 
    <div> 
        <table>
            <tbody>
                {Object.keys(data).map(element => (
                    typeof data[element] === 'object'?
                    (<tr><td className='heading'>{element}</td>{data[element].map(value => (
                    (<td key={JSON.stringify(value)}>{value}</td>)
                    ))}</tr>)
                    :(<tr><td className='heading'>{element}</td>
                    <td>{data[element]}</td></tr>)
                ))}
            </tbody>
        </table>
        </div>)
}
export default App;