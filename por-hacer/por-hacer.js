const fs = require('fs');
const colors = require('colors');
const { cpuUsage } = require('process');

let listadoPorHacer = [];

const actualizar = (descripcion, completado = true) => {
	cargarDb();

	let index = listadoPorHacer.findIndex(
		(tarea) => tarea.descripcion === descripcion
	);

	if (index >= 0) {
		listadoPorHacer[index].completado = completado;
		guardarDb();
		return true;
	} else {
		return false;
	}
};

const borrar = (descripcion) => {
	cargarDb();

	let tareas = listadoPorHacer.filter(
		(tarea) => tarea.descripcion === descripcion
	);

	if (tareas.length === 0) {
		return false;
	} else {
		tareas.forEach((tarea) =>
			listadoPorHacer.splice(
				listadoPorHacer.findIndex((t) => t.descripcion === tarea.descripcion),
				1
			)
		);

		guardarDb();

		return true;
	}
};

const crear = (descripcion) => {
	cargarDb();

	let porHacer = {
		descripcion,
		completado: false,
	};

	listadoPorHacer.push(porHacer);

	guardarDb();

	return porHacer;
};

const cargarDb = () => {
	try {
		listadoPorHacer = require('../db/data.json');
	} catch (error) {
		listadoPorHacer = [];
	}

	// console.log(listadoPorHacer);
};

const guardarDb = () => {
	let data = JSON.stringify(listadoPorHacer);

	fs.writeFile('db/data.json', data, (err) => {
		if (err) throw new Error('No se pudo grabar'.red.bold, err);
		console.log('La base de datos ha sido actualizada'.green);
	});
};

const getListado = (completadoTodo) => {
	cargarDb();

	if (completadoTodo === undefined) {
		return listadoPorHacer;
	} else {
		let elementosFiltrados = listadoPorHacer.filter(
			(tarea) => tarea.completado === completadoTodo
		);
		return elementosFiltrados;
	}
};

module.exports = {
	actualizar,
	borrar,
	crear,
	getListado,
};
