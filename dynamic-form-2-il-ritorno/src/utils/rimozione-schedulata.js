const fs = require('fs')
const path = require('path')

const inputJsonPath = path.join(__dirname, '../json-output')

function removeMany(howMany){
    fs.readdir(inputJsonPath, (err, files) =>{
        for (let i = 0; i<howMany; i++) {
            console.log(files[i])
            fs.unlink(path.join(inputJsonPath, files[i]), (err) => {
              if (err) throw err;
            })
    }
    })
    
}


fs.readdir(inputJsonPath, (err,files) => {
  if(files.length > 5) {
    console.log("Files rimossi: ")
    removeMany(files.length - 5)
  }
})

 