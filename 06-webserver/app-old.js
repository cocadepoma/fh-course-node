

const http = require('http');

http.createServer((req, res) => {


    //res.writeHead(200, { 'Content-Type': 'application/json' });

    // const persona = {
    //     id: 1,
    //     name: 'Paco'
    // }
    // res.write(JSON.stringify(persona));

    // res.setHeader('Content-Disposition', 'attachment; filename=lista.csv');
    // res.writeHead(200, { 'Content-Type': 'application/csv' });
    // res.write('id, nombre\n');
    // res.write('1, Pepe\n');
    // res.write('12, Juan\n');
    // res.write('13, María\n');
    // res.write('14, Maikel\n');



    res.write('Hola mundo');


    res.end();
})
    .listen(8080);

console.log('escuchando el puerto', 8080);