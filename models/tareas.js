const Tarea = require('./tarea');


class Tareas {

    _listado = {};


    get listadoArr (){

        const listado = [];

        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push( tarea );
        } );

        return listado;

    }

    constructor(){
        this._listado = {};
    }

    borrarTarea(id = ''){

        if(this._listado[id]){
            delete this._listado[id];
        }



    }

    cargarTareasFromArray(tareas = [] ){
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea (desc = ''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;  
    }

    listadoCompleto (){
        console.log('');
        for (let index = 0; index < this.listadoArr.length; index++) {
            const lugar = this.listadoArr[index];
            if(lugar['completadoEn'] === null){
                console.log(`${`${index+1 + '.'}`.green} ${lugar['desc']} :: ${'Pendiente'.red}`);
            }else{
                console.log(`${`${index + 1 + '.'}`.green} ${lugar['desc']} :: ${'Completada'.green}`);
            }
        }
    }

    listarPendientesCompletadas(completado = true){
        console.log('');
        let contador = 0;
        for(let index = 0; index < this.listadoArr.length; index++){
            const lugar = this.listadoArr[index];
            if(completado){         
                if(lugar['completadoEn']){
                    contador += 1;
                    console.log(`${`${contador + '.'}`.green} ${lugar['desc']} :: ${lugar.completadoEn.green}`);
                }
            }else{
                if(!lugar['completadoEn']){
                    contador += 1;
                    console.log(`${`${contador + '.'}`.green} ${lugar['desc']} :: ${'Pendiente'.red}`);
                }
            }
        }

    }

    toggleCompletadas(ids = []){
        ids.forEach(id => {
            const tarea = this._listado[id];
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString()
            }
        });

        this.listadoArr.forEach(tarea => {
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        })
    }

}

module.exports = Tareas;

