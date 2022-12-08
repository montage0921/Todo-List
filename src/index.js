// CSS Render
import "./style.css";

// import
import { renderProject } from "./viewController";
import { dataProcessor } from "./dataProcessor";
import isToday from "date-fns/isToday";

//QuerySelector
const addProjectBtn = document.querySelector("#add-project");
export const projectForm = document.querySelector(`#project-form`);

const projectInput = document.querySelector(`#project-form input`);

const hideProjectFormBtn = document.querySelector(`#project-cancel`);

export const projectContainer = document.querySelector(`.projectContainer`);

const addTodoBtn = document.querySelector(`#add-todo`);

export const todoForm = document.querySelector(`.todo-form`);

const hideTodoFormBtn = document.querySelector(`.button-cancel`);

const nameInput = document.querySelector(`#todo-name`);
const noteInput = document.querySelector(`#todo-note`);
const dateInput = document.querySelector(`#todo-date`);
const priorityInput = document.querySelector(`#priority`);

export const inputArr = [nameInput, noteInput, dateInput, priorityInput];

const todoContainer = document.querySelector(`.todoContainer`);

////////////////////////////
const eventController = (function () {
  /////////Project//////////////
  addProjectBtn.addEventListener(`click`, function () {
    renderProject.showProjectForm();
  });

  projectForm.addEventListener(`submit`, function (e) {
    e.preventDefault();

    const projectName = projectInput.value;

    const isRepeated = renderProject.validateProjectMsg(projectName);

    if (isRepeated) return;

    dataProcessor.addProject(projectName);

    renderProject.renderProjectList();

    projectInput.value = ``;
    renderProject.hideProjectForm();
  });

  hideProjectFormBtn.addEventListener(`click`, function () {
    projectInput.value = ``;
    renderProject.hideProjectForm();
  });

  projectContainer.addEventListener(`click`, function (e) {
    let project;

    if (e.target.className === `project`) {
      project = e.target.childNodes[3].textContent;
      renderProject.renderTodoList(project);
    } else if (e.target.className === `project-delete`) {
      project = e.target.parentNode.querySelector(`.project-name`).textContent;

      dataProcessor.removeProject(project);
      renderProject.renderProjectList();
    } else {
      project = e.target.parentNode.querySelector(`.project-name`).textContent;

      renderProject.renderTodoList(project);
    }
  });

  //////// NOT FINISHED///////////

  //////////Todo Event//////////////
  addTodoBtn.addEventListener(`click`, function () {
    renderProject.showTodoForm();
  });

  hideTodoFormBtn.addEventListener(`click`, function () {
    renderProject.hideTodoForm();
  });

  todoForm.addEventListener(`submit`, function (e) {
    e.preventDefault();

    const projectBelongTo = e.target.nextElementSibling.textContent;

    const name = nameInput.value;
    const note = noteInput.value;
    const date = dateInput.value;
    const priority = priorityInput.value;

    const isGood = renderProject.validateTodoMsg(date);
    if (isGood === false) return;

    dataProcessor.addTodo(name, note, date, priority, projectBelongTo);

    renderProject.renderTodoList(projectBelongTo);

    renderProject.hideTodoForm();
  });

  todoContainer.addEventListener(`click`, function (e) {
    const projectBelongTo = e.target.parentNode.childNodes[9].textContent;

    //delete todo
    if (e.target.className === `delete-todo`) {
      const todoID = +e.target.parentNode.id;

      dataProcessor.deleteTodo(todoID);
      renderProject.renderTodoList(projectBelongTo);
    }
    // check todo
    if (e.target.className === `checkbox`) {
      let isChecked = e.target.checked;
      console.log(isChecked);
      const todoID = +e.target.parentNode.id;

      dataProcessor.updateFinish(isChecked, todoID);

      e.target.parentNode.classList.toggle(`true`);
    }
  });
})();
