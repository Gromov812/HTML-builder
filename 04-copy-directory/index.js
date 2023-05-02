const fs = require('fs');
const path = require('path');

    let curPath = path.join(__dirname, 'files');
    let newPath = path.join(__dirname, 'files-copy');
    

async function copyDir (curPath, newPath) {
    
    fs.mkdir(newPath, {recursive : true}, (err, res) => {
        if (res == undefined) console.log(`Directory already exist!`);
        else console.log(`Directory created!`);

        fs.readdir(curPath, (err, res) => {
            res.forEach(el => {
                 fs.createReadStream(path.join(`${curPath}`, `${el}`))
                 .pipe(fs.createWriteStream(path.join(`${newPath}`, `${el}`)))
            })
            console.log(`Files copied in ${newPath}`);
        })
    })
}

copyDir(curPath, newPath)
