import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import './table.css'
const fetch = require('cross-fetch')

function App() {
    const [searchData, setSearchData] = useState('');
    const [buildData, setBuildData] = useState('');
    useEffect(() => {
        fetch('SearchFile.txt').then(response => response.json()).then(readData => setSearchData(readData))
        fetch('BuildFile.txt').then(response => response.json()).then(readData => setBuildData(readData))
    }, [])
    return ( 
    <div> 
        <h2>Search Data</h2>
        <table>
            <tbody>
                {Object.keys(searchData).map(element => ( 
                    typeof searchData[element] === 'object'?
                    (<tr><td className='heading'>{element}</td>{searchData[element].map(value => (
                    (<td key={JSON.stringify(value)}>{value}</td>)
                    ))}</tr>)
                    :(<tr><td className='heading'>{element}</td>
                    <td>{searchData[element].split(' ')}</td></tr>)
                ))}
            </tbody>
        </table>
        <h2>Build Data</h2>
        <table>
            <tbody>
                {Object.keys(buildData).map(element => ( 
                    typeof buildData[element] === 'object'?
                    (<tr><td className='heading'>{element}</td>{buildData[element].map(value => (
                    (<td key={JSON.stringify(value)}>{value}</td>)
                    ))}</tr>)
                    :(<tr><td className='heading'>{element}</td>
                    <td>{buildData[element].split(' ')}</td></tr>)
                ))}
            </tbody>
        </table>
        </div>)
}
export default App;