const fs = require('node:fs');
const path = require('node:path'); 



let rs = new fs.createReadStream(path.join(__dirname, 'text.txt'), {encoding: 'utf-8'});

rs.on('data', (data) => {
    console.log(data);
})  