const fs = require('fs')
const path = require('path')

const inputJsonPath = path.join(__dirname, '../json-output')

const monthNums = ['01','02','03','04','05','06','07','08','09','10','11', '12']

function removeMany(mm, yy){
    fs.readdir(inputJsonPath, (err, files) =>{
        for (let i = 0; i<files.length; i++) {

          
            fileSeparato = files[i].split('-')
            let time = parseInt(fileSeparato[0])
            let dataFile = new Date(time)
            let month = monthNums[dataFile.getMonth()]
            let year = dataFile.getFullYear()
            //console.log(month, year)
            if(mm == month && yy == year){
              fs.unlink(path.join(inputJsonPath, files[i]), (err) => {
                if (err) throw err;
              })
            }    
    }
    })
    
}

const mm = process.argv[2]
const yy = process.argv[3]

removeMany(mm, yy) 