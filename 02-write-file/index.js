const fs = require('fs');
const path = require('path')

let writeStream = fs.createWriteStream(path.join(__dirname, 'text.txt'));

console.log(`Введите текст для записи в файл:`);

process.stdin.on('data', data => {

    if (data.toString().includes('exit')) {

        
        console.log(`Команда exit получена, завершаем запись!`);
        writeStream.end();
        process.exit();
    }

    else {
        writeStream.write(data)
        console.log(`Сообщение '${data.toString()}' записано в файл! Что-нибудь ещё?`);
    }
})

