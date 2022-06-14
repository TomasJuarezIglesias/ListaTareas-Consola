require('colors');


const { inquirerMenu,
        pausa,
        leerInput,
        listadoTareasBorrar,
        confirmar,
        mostrarListadoChecklist} = require('./helpers/inquirer')
const Tareas = require('./models/tareas');
const {guardarDB, leerDB} = require('./helpers/guardarArchivo')



const main = async() => {

    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();

    if(tareasDB){ // cargar tareas
        tareas.cargarTareasFromArray(tareasDB);
    }

    do{
        // Imprime el menu
        opt = await inquirerMenu();


        switch(opt){
            case '1':// crear opcion
                const desc = await leerInput('Descripcion: ');
                tareas.crearTarea(desc);
                break;
            case '2': // Lista todas las tareas
                tareas.listadoCompleto();
                break;
            case '3': // Lista solo completadas
                tareas.listarPendientesCompletadas(true);
                break;
            case'4':// lista no completadas
                tareas.listarPendientesCompletadas(false);
                break;
            case '5': // marcar completado
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                
                break;
            case '6': // Borrar tareas
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if(id != 0){
                    const ok = await confirmar('¿Estas seguro?');
                    if(ok){
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada correctamente');
                    }
                }
        }

        guardarDB(tareas.listadoArr);
        await pausa();


    }while(opt !== '0');

}

main();







