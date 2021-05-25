const Tarea = require("./tarea");


class Tareas {

    _listado = {};

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            listado.push(this._listado[key]);
        });
        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    cargarTareasFromArray(tareas = []) {
        for (const tarea of tareas) {
            this._listado[tarea.id] = tarea;
        }
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {

        console.log(`\n`);

        this.listadoArr.forEach((task, i) => {

            const idx = `${i + 1}`.green;
            const { desc } = task;
            const estado = task.completadoEn ? 'Completada'.green : 'Pendiente'.red;

            console.log(`${idx}. ${desc} :: ${estado}`);
        });
    }

    listarPendientesCompletadas(completadas = true) {

        let contador = 0;
        console.log();

        this.listadoArr.forEach(task => {

            const { desc } = task;
            const estado = task.completadoEn ? 'Completada'.green : 'Pendiente'.red;

            // Completadas
            if (completadas && task.completadoEn) {
                contador += 1;
                console.log(`${(contador + '.').green} ${desc} :: ${task.completadoEn.green}`);
            }

            // Pendientes
            if (!completadas && !task.completadoEn) {
                contador += 1;
                console.log(`${(contador + '.').green} ${desc} :: ${estado}`);
            }

        });
    }

    toggleCompletadas(ids = []) {

        ids.forEach(id => {

            const tarea = this._listado[id];

            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach(tarea => {
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        });


    }

}

module.exports = Tareas;