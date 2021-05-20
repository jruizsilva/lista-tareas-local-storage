// Functions
const iniciarApp = () => {
	disableSubmit();
	resetForm();
	loadEventListeners();
};
const resetForm = () => {
	formulario.reset();
};
const disableSubmit = () => {
	submit.disabled = true;
	submit.classList.remove("cursor-allowed");
	submit.classList.add("opacity-50", "cursor-not-allowed");
};
const enableSubmit = () => {
	submit.disabled = false;
	submit.classList.add("cursor-allowed");
	submit.classList.remove("opacity-50", "cursor-not-allowed");
};
const validarInput = (e) => {
	if (e.target.value === "") {
		disableSubmit();
	} else {
		enableSubmit();
	}
};
const agregarTarea = (e) => {
	e.preventDefault();
	const tarea = {
		tarea: input.value,
		id: Date.now(),
		bgColor: "bg-red",
	};
	arrayTareas.push(tarea);
	mostrarTareas();
};
const mostrarTareas = () => {
	limpiarHTML();
	const template = document.querySelector("#template").content;
	const fragment = document.createDocumentFragment();
	arrayTareas.forEach(({ id, tarea, bgColor }) => {
		template.querySelector("#paragraph").textContent = tarea;
		template.querySelector("#tarea").setAttribute("data-id", id);
		template.querySelector("#tarea").classList.remove("bg-red", "bg-green");
		template.querySelector("#tarea").classList.add(bgColor);

		const clone = template.cloneNode(true);
		fragment.appendChild(clone);
	});
	listaTareas.appendChild(fragment);
};
const limpiarHTML = () => {
	while (listaTareas.firstChild) {
		listaTareas.removeChild(listaTareas.firstChild);
	}
};
const borrarTarea = (e) => {
	if (e.target.getAttribute("id") === "borrar") {
		const idTarea = parseInt(e.target.parentElement.getAttribute("data-id"));
		arrayTareas = arrayTareas.filter((tarea) => tarea.id !== idTarea);
		mostrarTareas();
	}
};
const terminarTarea = (e) => {
	if (e.target.getAttribute("id") === "terminar-tarea") {
		const idTarea = parseInt(e.target.parentElement.getAttribute("data-id"));
		if (e.target.parentElement.classList.contains("bg-red")) {
			arrayTareas = arrayTareas.map((tarea) => {
				if (idTarea === tarea.id) {
					tarea.bgColor = "bg-green";
					return tarea;
				} else {
					return tarea;
				}
			});
		} else if (e.target.parentElement.classList.contains("bg-green")) {
			arrayTareas = arrayTareas.map((tarea) => {
				if (idTarea === tarea.id) {
					tarea.bgColor = "bg-red";
					return tarea;
				} else {
					return tarea;
				}
			});
		}
		console.log(arrayTareas);
		mostrarTareas();
	}
};
// Variables
let arrayTareas = [];
const formulario = document.querySelector("#form");
const input = document.querySelector("#input");
const listaTareas = document.querySelector("#lista-tareas");
const btnBorrar = document.querySelector("#borrar");

const loadEventListeners = () => {
	input.addEventListener("blur", validarInput);
	formulario.addEventListener("submit", agregarTarea);
	listaTareas.addEventListener("click", borrarTarea);
	listaTareas.addEventListener("click", terminarTarea);
};
document.addEventListener("DOMContentLoaded", iniciarApp);
