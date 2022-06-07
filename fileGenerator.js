let fs = require('fs');
let path = require('path');
const generateSearchData = require('./util')
const maindirectory = process.argv.slice(2)[0];
const fileGenerator = (mainDirectory) => {
    fs.writeFileSync('./public/FileNames.txt','')
    fs.promises.readdir(mainDirectory).then((subDirectories => {
        subDirectories.forEach(subDirectory => {
            fs.promises.readdir(`${mainDirectory}\\${subDirectory}`).then((testDirectories => {
                Promise.all(testDirectories.map((testDirectory) => {
                    return fs.promises.lstat(`${mainDirectory}\\${subDirectory}\\${testDirectory}`).then(async (stat) =>{
                        if(stat.isDirectory()){
                            await generateSearchData(`${mainDirectory}\\${subDirectory}\\${testDirectory}\\report.txt`, `public/${subDirectory}${testDirectory}search.txt`)
                            .then(() => {
                                return fs.promises.appendFile('./public/FileNames.txt', `${subDirectory}${testDirectory}search.txt\n` )
                        })
                    }
                }).catch(err => console.log("Error:",err))
                })).then(() => console.log("Files created"))
            }))
        }) 
    }))
}
fileGenerator(maindirectory)