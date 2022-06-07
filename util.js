let fs = require('fs');
let path = require('path');
const getValue = (line,searchString) => {
    let index = line.indexOf(searchString)
    return line.slice(index).split(',')?.[0]
}
module.exports = generateSearchData = (filePath, reportFile) => {
    let substage = false;
    return new Promise((resolve) => {
        fs.readFile(filePath, 'utf-8', (err, readData) => {
            if(err){
                console.log("Error: " + err)
            } else {
                let data = readData;
                data = data.replaceAll('\t', '')
                data = data.replaceAll('\r', '')
                data = data.split('\n')
                let output = data.reduce((output, line) => {
                    if(line.indexOf('Sub stage') > -1) substage = true
                    if(line.indexOf('Latency') > -1){
                        let latencies = line.split(' ')
                        latencies.forEach((latency,index) => {
                            if(index %2 === 0 && index < latencies.length-1){
                            output[latency] = latencies[index+1]
                            }
                        })
                    }
                    if(line.indexOf('Ios') > -1){
                        let ios = line.split(' ')
                        ios.forEach((i, index) => {
                            if(index % 2 === 0 && index < ios.length-1) output[i] = ios[index+1]
                        })
                    }
    
                    if(line.indexOf('Read IOPS') > -1){
                        let value = getValue(line, 'Read IOPS')
                        value = value.split(' ')
                        output.IOPS = value[value.length-1]
                    }
    
                    if(line.indexOf('Average/Peak working set') > -1 && substage === true){
                        let index = line.indexOf('Average/Peak working set')
                        let firstvalue = line.slice(index).split(',')[0];
                        firstvalue = firstvalue.split(' ');
                        output.Average_Working_Set.push([firstvalue[firstvalue.length-1], line.slice(index).split(',')[1]])
                    }
    
                    if(line.indexOf('Total run time') > -1){
                        let value = getValue(line, 'Total run time')
                        value = value.split(' ')
                        output.total_run_Time = value[value.length-1]
                    }
                    if(line.indexOf('search thread count') > -1){
                        let value = getValue(line, 'search thread count')
                        value = value.split(' ')
                        output.search_thread_count = value[value.length-1]
                    }
                    if(line.indexOf('QPS') > -1){
                        let value = getValue(line, 'QPS')
                        value = value.split(' ')
                        output.QPS = value[value.length-1]
                    }
                    if(line.indexOf('recall@top') > -1){
                        value = getValue(line, 'recall')
                        value = value.split(' ')
                        output[value[0]] = value[value.length-1]
                    }
                    return output
                }, {
                IOPS: '',
                Average_Working_Set: [],
                total_run_Time: '',
                search_thread_count: '',
                QPS: '',
            }) 
                fs.writeFile(reportFile, JSON.stringify(output), "utf-8", (err => {
                    if (err) console.log(err)
                    else resolve()
                }))
            }
        })
    })
}