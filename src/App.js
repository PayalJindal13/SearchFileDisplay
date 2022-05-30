import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import './table.css'
const fetch = require('cross-fetch')

function App() {
    const [searchData, setSearchData] = useState('');
    const [buildData, setBuildData] = useState('');
    const [searchMaxLength, setSearchMaxLength] = useState('');
    const columns = Object.keys(searchData);
    useEffect(() => {
        fetch('SearchFile.txt').then(response => response.json()).then(readData => setSearchData(readData))
        fetch('BuildFile.txt').then(response => response.json()).then(readData => setBuildData(readData))
    }, [])

    useEffect(() => {
        setSearchMaxLength(Math.max(columns.reduce((max, column) => {
            max = searchData[column].length > max? searchData[column].length:max;
            return max
        },0)))
    },[searchData])
    return ( 
    <div> 
        <h2>Search Data</h2>
        <table>
            <thead>
                <tr>
                {Object.keys(searchData).map(heading => (
                    <td className='heading'>{heading}</td>
                ))}
                </tr>
            </thead>
            <tbody>
                <tr>
                {Object.keys(searchData).map(element =>(
                     typeof searchData[element] === 'object'?
                     <td>{searchData[element].map(value => 
                             (<tr className='insideRow'><td className='insideRow'>{value[0]}</td> <td className='insideRow'>{value[1]}</td></tr>))}</td>
                     :(<td>{searchData[element]}</td>) 
                ))}
                </tr>
            </tbody>
        </table>
        <h2>Build Data</h2>
        <table>
            <thead>
            <tr>
                {Object.keys(buildData).map(heading => (
                    <td className='heading'>{heading}</td>
                ))}
                </tr>
            </thead>
            <tbody>
                <tr>
                {Object.keys(buildData).map(element => 
                     (<td>{buildData[element]}</td>) 
                )}
                </tr>
                {/* {Object.keys(buildData).map(element => ( 
                    typeof buildData[element] === 'object'?
                    (<tr><td className='heading'>{element}</td>{buildData[element].map(value => (
                    (<td key={JSON.stringify(value)}>{value}</td>)
                    ))}</tr>)
                    :(<tr><td className='heading'>{element}</td>
                    <td>{buildData[element]}</td></tr>)
                ))} */}
            </tbody>
        </table>
        </div>)
}
export default App;