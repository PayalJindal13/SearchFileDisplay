import './App.css';
import { useEffect, useState } from 'react';
import './table.css'
const fetch = require('cross-fetch')

function App() {
    const [files, setFiles] = useState([])
    const [searchData, setSearchData] = useState({});
    useEffect(() => {
        fetch('FileNames.txt').then(response => response.text()).then(filenames => {
            setFiles(filenames.split('\n').filter(filename => filename))
        })
    }, [])

    useEffect(() => {
        Promise.all(files.map(file => {
            return fetch(file).then(response => response.json())
        })).then(filesData => {
            const newSearchData = filesData.reduce((newSearchData, eachFileData, index) => {
                newSearchData[files[index]] = eachFileData
                return newSearchData
            }, {})
            setSearchData(newSearchData)
        })

    }, [files])

    return (
        <div>
            <h2>Search Data</h2>
            <table>
                <thead>
                    {searchData && <tr>
                        <td></td>
                        {Object.keys(searchData).length && Object.keys(searchData[Object.keys(searchData)[0]]).map(heading => (
                            <td className='heading'>{heading}</td>
                        ))}
                    </tr>}

                </thead>
                <tbody>
                    {Object.keys(searchData).length && Object.keys(searchData).map(file => (
                        <tr>
                            <td className='rowHeading'>{`${file.replace('search.txt', '')}`}</td>
                            {Object.values(searchData[file]).map(property =>
                                property === 'Average_Working_Set' ?
                                    <td>
                                        <tr className='insideRow'>
                                            <td className='dataInArray'>{property[0]}  {property[1]}</td>
                                        </tr>
                                    </td>
                                    : (<td>{property}</td>)
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>)
}
export default App;