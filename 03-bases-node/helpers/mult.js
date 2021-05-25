

const colors = require('colors');

const fs = require('fs');

const crearArchivo = async (base, tope, listar) => {

    let salida = ``;
    let consola = ``;

    for (let i = base; i <= tope; i++) {

        salida += `
===============
  Tabla del ${i}
===============

`;
        consola += `
===============
  Tabla del ${(i).toString().green}
===============

`;

        for (let index = 1; index <= 10; index++) {
            salida += `${i} x ${index} = ${(i * index)}\n`;
            consola += `${i.toString().green} ${'x'.toString().blue} ${index.toString().green} ${'='.toString().blue} ${(i * index).toString().red}\n`;

            if (index === 10) {
                salida += `\n`;
            }
        }
    }

    if (listar) {
        console.log(consola);
    }

    try {
        fs.writeFileSync('./salida/tablas.txt', salida);
        return 'tablas.txt';
    } catch (error) {
        throw `Error al crear el archivo ${error}`;
    }
}

module.exports = {
    crearArchivo
}