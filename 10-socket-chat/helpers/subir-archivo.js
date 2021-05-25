
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const subirArchivo = (files, extensionesValidas = ['image/png', 'image/jpg', 'image/gif', 'image/jpeg'], carpeta = '') => {

    return new Promise((resolve, reject) => {
        const { archivo } = files;

        // Cortar extensión
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];


        // Validar la extension
        //const extensionesValidas = ['png', 'jpg, jpeg', 'gif'];
        //const validExtensions = ['image/png', 'image/jpg', 'image/gif', 'image/jpeg'];
        if (!extensionesValidas.includes(archivo.mimetype)) {
            return reject(`La extension ${archivo.mimetype} no es permitida, estas son las extensiones permitidas: ${extensionesValidas}`);
        }

        // Concatenar uuid único + extensión
        const nombreTemp = uuidv4() + '.' + extension;

        const uploadPath = path.join(__dirname, '../public/assets/', carpeta, nombreTemp);

        archivo.mv(uploadPath, (err) => {
            if (err) {
                return reject(err);
            }

            resolve(nombreTemp);
        });

    });
}

module.exports = { subirArchivo };