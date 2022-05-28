let fs = require('fs');
let path = require('path');
const getData = () => {
    fs.readFile(path.join('/', 'Work/diskann/benchmark_sift1m_l2_search_report.txt'), 'utf-8', (err, data) => {
        if(err){
            console.log("Error: " + err)
        } else {
            data = data.replaceAll('\t', '')
            data = data.replaceAll('\r', '')
            data = data.split('\n')
            const getValues = (line,searchString) => {
                let index = line.indexOf(searchString)
                return line.slice(index).split(',')[0]
            }
            let output = data.reduce((output, line) => {
                if(line.indexOf('Latency') > -1){
                    let latencies = line.split('Latency')
                    latencies.forEach(latency => {
                        if(latency) output.latencies.push(latency)
                    })
                    console.log(output.latencies)
                }
                if(line.indexOf('Ios') > -1){
                    let ios = line.split('Ios')
                    ios.forEach(i => {
                        if(i) output.Ios.push(i)
                    })
                    console.log(output.Ios)
                }

                if(line.indexOf('Read IOPS') > -1){
                    output.IOPS = getValues(line, 'Read IOPS')
                    console.log(output.IOPS)
                }

                if(line.indexOf('Average/Peak working set') > -1){
                    let index = line.indexOf('Average/Peak working set')
                    output.AverageWorkingSet.push([line.slice(index).split(',')[0], line.slice(index).split(',')[1]])
                    console.log(output.AverageWorkingSet)
                }

                if(line.indexOf('Total run time') > -1){
                    output.runTime = getValues(line, 'Total run time')
                    console.log(output.runTime)
                }
                if(line.indexOf('search thread count') > -1){
                    output.searchThread = getValues(line, 'search thread count')
                    console.log(output.searchThread)
                }
                if(line.indexOf('QPS') > -1){
                    output.QPS = getValues(line, 'QPS')
                    console.log(output.QPS)
                }
                if(line.indexOf('recall@top') > -1){
                    output.recall = getValues(line, 'recall')
                    console.log(output.recall)
                }
                return output
            }, {
            latencies: [],
            Ios: [],
            IOPS: '',
            recall: '',
            AverageWorkingSet: [],
            runTime: '',
            searchThread: '',
            QPS: '',
        })

            fs.writeFile('public/DisplayFile.txt', JSON.stringify(output), "utf-8", (err => {
                if (err) console.log(err)
            }))
        }
    })
}

getData()