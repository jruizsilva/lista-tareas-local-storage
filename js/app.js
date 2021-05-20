// Functions
const startApp = () => {
	resetForm();
	showDB();
};
const resetForm = () => {
	formulario.reset();
};
const msjError = () => {
	const main = document.querySelector("#main");
	const template = document.querySelector("#template-error").content;
	const clone = template.cloneNode(true);
	const section = main.querySelector("#section");
	if (document.querySelectorAll("#error").length === 0) {
		main.insertBefore(clone, section);
	}
};
const deleteMsjError = () => {
	if (document.querySelector("#error")) {
		document.querySelector("#error").remove();
	}
};
const addTask = (e) => {
	e.preventDefault();
	if (input.value !== "") {
		deleteMsjError();
		const tarea = {
			tarea: input.value,
			id: Date.now(),
			bgColor: "bg-red",
			estado: "pendiente",
		};
		arrayTareas.push(tarea);
		addTasksDB();
		showDB();
	} else {
		msjError();
	}
};
const showDB = () => {
	getTasksDB();
	cleanHTML();
	const template = document.querySelector("#template-tarea").content;
	const fragment = document.createDocumentFragment();
	arrayTareas.forEach(({ id, tarea, bgColor, estado }) => {
		template.querySelector("#paragraph").textContent = `${tarea} -> ${estado}`;
		template.querySelector("#tarea").setAttribute("data-id", id);
		template.querySelector("#tarea").classList.remove("bg-red", "bg-green");
		template.querySelector("#tarea").classList.add(bgColor);

		const clone = template.cloneNode(true);
		fragment.appendChild(clone);
	});
	listaTareas.appendChild(fragment);
};
const cleanHTML = () => {
	while (listaTareas.firstChild) {
		listaTareas.removeChild(listaTareas.firstChild);
	}
};
const deleteTask = (e) => {
	if (e.target.getAttribute("id") === "borrar") {
		const idTarea = parseInt(e.target.parentElement.getAttribute("data-id"));
		arrayTareas = arrayTareas.filter((tarea) => tarea.id !== idTarea);
		addTasksDB();
		showDB();
	}
};
const modifyTask = (e) => {
	if (e.target.getAttribute("id") === "terminar-tarea") {
		const idTarea = parseInt(e.target.parentElement.getAttribute("data-id"));
		if (e.target.parentElement.classList.contains("bg-red")) {
			arrayTareas = arrayTareas.map((tarea) => {
				if (idTarea === tarea.id) {
					tarea.bgColor = "bg-green";
					tarea.estado = "terminada";
					return tarea;
				} else {
					return tarea;
				}
			});
		} else if (e.target.parentElement.classList.contains("bg-green")) {
			arrayTareas = arrayTareas.map((tarea) => {
				if (idTarea === tarea.id) {
					tarea.bgColor = "bg-red";
					tarea.estado = "pendiente";
					return tarea;
				} else {
					return tarea;
				}
			});
		}
		addTasksDB();
		showDB();
	}
};
const addTasksDB = () => {
	localStorage.setItem("tareas", JSON.stringify(arrayTareas));
	resetForm();
};
const getTasksDB = () => {
	if (localStorage.getItem("tareas")) {
		arrayTareas = JSON.parse(localStorage.getItem("tareas"));
	}
};
// Variables
let arrayTareas = [];
const formulario = document.querySelector("#form");
const input = document.querySelector("#input");
const listaTareas = document.querySelector("#lista-tareas");
const btnBorrar = document.querySelector("#borrar");

const loadEventListeners = () => {
	input.addEventListener("blur", deleteMsjError);
	formulario.addEventListener("submit", addTask);
	listaTareas.addEventListener("click", deleteTask);
	listaTareas.addEventListener("click", modifyTask);
};
loadEventListeners();
document.addEventListener("DOMContentLoaded", startApp);
