const fs = require('fs');
const path = require('path');

const stylesDir = path.join(__dirname, 'styles');
const bundleDir = path.join(__dirname, 'project-dist')

fs.readdir(stylesDir, (err, res) => {
    
    let bundle = '';

    res.forEach(el => {
        if (path.extname(el) == '.css') {
            let rs = fs.createReadStream(path.join(stylesDir, el), {encoding: 'utf-8'});
            let ws = fs.createWriteStream(path.join(bundleDir, 'bundle.css'));
            
            rs.on('data', res => {
                bundle += res;        
                ws.write(bundle);
            })
        }
    })

    
   
})
