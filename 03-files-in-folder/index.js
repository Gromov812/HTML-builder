const fs = require('fs');
const path = require('path');



fs.readdir(path.join(__dirname, '/secret-folder'),{withFileTypes: true},  (err, res) => {
    res.forEach(el => {
        if (el.isFile()) {
            fs.lstat(path.join(`${__dirname}/secret-folder`, el.name), (err, res) => {
                console.log(`${path.basename(el.name, path.extname(el.name))} - ${path.extname(el.name)} - ${res.size/1000}KB`);
            })
        } 

    })
})

