// const opt ={ 	descripcion: {
//     alias: 'd',
//     demand: true,
// }}

const completado = {
	alias: 'c',
	default: true,
	desc: 'Indica si la tarea se ha completado',
	type: 'boolean',
};

const completadoTodo = {
	alias: 'c',
	desc: 'Indica si la tarea se ha completado',
	type: 'boolean',
};

const descripcion = {
	alias: 'd',
	demand: true,
	desc: 'Descripción de la tarea por hacer',
};

const argv = require('yargs')
	.command('crear', 'Crear un elemento por hacer', { descripcion })
	.command('actualizar', 'Actualiza el estado completado de una tarea', {
		descripcion,
		completado,
	})
	.command('borrar', 'Borrar un elemento por hacer', { descripcion })
	.command('listar', 'Listar todos los elementos', { completadoTodo })
	.help().argv;

module.exports = {
	argv,
};
