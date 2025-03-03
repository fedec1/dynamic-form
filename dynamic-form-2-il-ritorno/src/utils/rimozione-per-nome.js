const fs = require('fs')
const path = require('path')

const inputJsonPath = path.join(__dirname, '../json-output')


function removeMany(name){
    fs.readdir(inputJsonPath, (err, files) =>{
        for (let i = 0; i<files.length; i++) {

          
            fileSeparato = files[i].split('-')
            let nome = fileSeparato[1]
            let nomeSep = nome.split('.')
            if(name == nomeSep[0]){
              fs.unlink(path.join(inputJsonPath, files[i]), (err) => {
                if (err) throw err;
              })
            }    
    }
    })
    
}

const name = process.argv[2]

removeMany(name) 