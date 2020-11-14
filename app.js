// const { argv } = require('yargs');
// const { require } = require("yargs");

const colors = require('colors');

const argv = require('./config/yargs').argv;
const porHacer = require('./por-hacer/por-hacer');

let comando = argv._[0];

switch (comando) {
	case 'actualizar':
		let actualizado = porHacer.actualizar(argv.descripcion, argv.completado);
		if (actualizado) {
			console.log('La tarea se actualizó correctamente');
		} else {
			console.log('La tarea NO se actualizó correctamente');
		}
		break;
	case 'borrar':
		let borrado = porHacer.borrar(argv.descripcion);
		console.log('Lo ha borrado: '.grey, borrado);
		break;
	case 'crear':
		let tarea = porHacer.crear(argv.descripcion);
		console.log(tarea);
		break;
	case 'listar':
		let listado = porHacer.getListado(argv.completadoTodo);
		for (let tarea of listado) {
			console.log('========= POR HACER ========='.green);
			console.log(tarea.descripcion.bold);
			console.log('Estado: '.grey, tarea.completado);
			console.log('============================='.green);
		}
		break;
	default:
		break;
}
