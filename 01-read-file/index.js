const fs = require('node:fs');
const path = require('node:path'); 



let rs = new fs.ReadStream(path.join(__dirname, 'text.txt'), {encoding: 'utf-8'});

rs.on('readable', () => {
    let data = rs.read();
    console.log(data);
})