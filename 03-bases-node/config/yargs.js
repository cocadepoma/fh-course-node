
const argv = require('yargs').options({
    'b': {
        alias: 'base',
        type: 'number',
        demandOption: true,
        describe: 'base de la tabla de multiplciar'
    },
    't': {
        alias: 'tope',
        type: 'number',
        demandOption: true,
        describe: 'tope de la tabla de multiplciar'
    },
    'l': {
        alias: 'listar',
        type: 'boolean',
        default: false,
        describe: 'lista en consola la/s tabla/s'
    },

}).check((argv, options) => {
    if (isNaN(argv.b)) {
        throw 'La base tiene que ser un número'
    }
    if (isNaN(argv.t)) {
        throw 'El límite tiene que ser un número'
    }
    if (argv.b > argv.t) {
        throw 'El límite debe de ser mayor que la base'
    }
    return true;
}).argv;

module.exports = argv;