const fs = require('fs')
const path = require('path')

const inputJsonPath = path.join(__dirname, '../json-output')

function removeMany(howMany){
    fs.readdir(inputJsonPath, (err, files) =>{

      let sorted = files.sort(function(a, b){
        if(parseInt(a.split('-')[0]) < parseInt(b.split('-')[0])) { return -1; }
        if(parseInt(a.split('-')[0]) > parseInt(b.split('-')[0])) { return 1; }
        return 0;
    })

        for (let i = 0; i<howMany; i++) {
            console.log(sorted[i])
            fs.unlink(path.join(inputJsonPath, sorted[i]), (err) => {
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

 