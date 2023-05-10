const fs = require('fs');
const fsPromise = require('fs').promises;
const path = require('path');

const templatePath = path.join(__dirname, 'template.html');
const componentsPath = path.join(__dirname, 'components');
const distPath = path.join(__dirname, 'project-dist');
const distIndexPath = path.join(__dirname, 'project-dist', 'index.html');



/* CREATE DIRECTORY AND COPY FILE */
/* READ template => read dir with components =>  rewrite template and push it in index */


const readTemplate = fs.createReadStream(templatePath, 'utf-8'); // Создаем поток чтения файла шаблона
// const writeTemplate = fs.createWriteStream(templatePath);

const writeIndex = fs.createWriteStream(distIndexPath, 'utf-8'); // Создаем поток записи в файл индекса

fs.mkdir(distPath, { recursive: true }, err => { // Создаём папку project-dist
    if (err) throw new err;
})
// fs.createWriteStream(distIndexPath).pipe(fs.createReadStream(templatePath));
readTemplate.on('data', (data) => {                         // Читаем файл шаблона
    let modified = data;
    // Записываем переменную содержимым шаблона
    fsPromise.readdir(componentsPath)
        .then(res => {        // Читаем содержимое папки компонентс
            res.forEach((el, i) => {
                fs.createReadStream(path.join(componentsPath, `${el}`), 'utf-8') // Создаём потом и читаем содержимое файлов в компонентс
                    .on('data', componentData => {
                        if (modified.includes(path.basename(el, path.extname(el)))) { // Если в содержимом переменной есть название текущего компонента, то заменим
                            modified = modified.replace(`{{${path.basename(el, path.extname(el))}}}`, componentData);
                        }
                        if (i === res.length - 1) {
                            writeIndex.write(modified);
                        }

                    })
            }) // должно проитерироваться 3 раза и вернуть измененный modified
            return modified;
        })

})


const stylesPath = path.join(__dirname, 'styles');
const styleFilePath = path.join(distPath, 'style.css');
const styleWS = fs.createWriteStream(styleFilePath);

fs.readdir(stylesPath, (err, files) => {
    let bundle = '';
    files.forEach(elem => {
        fs.createReadStream(path.join(stylesPath, elem), 'utf-8')
            .on('data', data => {
                bundle = data;
                styleWS.write(bundle);
            })
    })
})

const assetsPath = path.join(__dirname, 'assets');
const distAssetsPath = path.join(distPath, 'assets');



fs.rmdir(distAssetsPath, { recursive: true }, (err, res) => {
fs.mkdir(distAssetsPath, { recursive: true }, (err) => {
    if (err) console.log(err);
    fs.readdir(assetsPath, { withFileTypes: true }, (err, files) => {
        if (err) return err;

        files.forEach(async el => {


            let curPathToWrite = path.join(distPath, 'assets', el.name)
            if (el.isDirectory()) {
               
                    fs.mkdir(curPathToWrite, { recursive: true }, (err) => {
                        if (err) console.log(err);
                        fs.readdir(path.join(assetsPath, el.name), (err, res) => {
                            if (err) console.log(err);
                            res.forEach(elem => {
                                fs.createReadStream(path.join(assetsPath, el.name, elem)).pipe(fs.createWriteStream(path.join(curPathToWrite, elem)))
                            })
                        })
                    })
               
            }
        })

    })

})
})

