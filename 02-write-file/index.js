const fs = require('fs');
const path = require('path')

let writeStream = fs.createWriteStream(path.join(__dirname, 'text.txt'));

console.log(`Введите текст для записи в файл:`);

process.stdin.on('data', data => {

    if (data.toString().includes('exit')) {
        console.log(`Запись завершена, всего доброго!`);
        writeStream.end();
        process.exit();
    }

    else {
        writeStream.write(data)
        console.log(`Сообщение '${data.toString()}' записано в файл! Что-нибудь ещё?`);
    }
    process.on('SIGINT', () => {
        console.log(`Запись завершена, всего доброго!!`);
        writeStream.end();
        process.exit();
    })

})


