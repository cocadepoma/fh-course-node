
const { crearArchivo } = require('./helpers/mult');
const argv = require('./config/yargs');

require('colors');

// No hacer
// const [, , arg3 = 'base=5', arg4 = 'base=10'] = process.argv;
// const [, base = 5] = arg3.split('=');
// const [, base2 = 10] = arg4.split('=');

crearArchivo(argv.b, argv.t, argv.l)
    .then(archivo => console.log(archivo.rainbow, 'creado'))
    .catch(err => console.log(err));


