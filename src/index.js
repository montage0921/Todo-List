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

const inboxBtn = document.querySelector(`.inbox`);
const todayBtn = document.querySelector(`.today`);
const upcomingBtn = document.querySelector(`.upcoming`);

////////////////////////////
const eventController = (function () {
  dataProcessor.getLocalStorage();
  renderProject.renderProjectList();
  renderProject.renderTodoList(`Inbox`);

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
    dataProcessor.setLocalStorage();

    renderProject.renderProjectList();
    renderProject.renderTodoList(projectName);

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
      addTodoBtn.classList.remove(`hidden`);
    } else if (e.target.className === `project-delete`) {
      project = e.target.parentNode.querySelector(`.project-name`).textContent;

      dataProcessor.removeProject(project);
      dataProcessor.setLocalStorage();

      renderProject.renderProjectList();
      renderProject.renderTodoList(`Inbox`);
    } else {
      project = e.target.parentNode.querySelector(`.project-name`).textContent;
      addTodoBtn.classList.remove(`hidden`);
      renderProject.renderTodoList(project);
    }
  });

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
    dataProcessor.setLocalStorage();

    renderProject.renderTodoList(projectBelongTo);

    renderProject.hideTodoForm();
  });

  todoContainer.addEventListener(`click`, function (e) {
    let projectBelongTo;
    if (e.target.parentNode.childNodes[9] !== undefined) {
      projectBelongTo = e.target.parentNode.childNodes[9].textContent;
    }

    let currentProject =
      e.target.parentNode.parentNode.parentNode.querySelector(
        `.whichProjectItis`
      ).textContent;

    //delete todo
    if (e.target.className === `delete-todo`) {
      const todoID = +e.target.parentNode.id;

      dataProcessor.deleteTodo(todoID);
      dataProcessor.setLocalStorage();

      renderProject.renderTodoList(currentProject);
    }
    // check todo
    if (e.target.className === `checkbox`) {
      let isChecked = e.target.checked;

      const todoID = +e.target.parentNode.id;

      dataProcessor.updateFinish(isChecked, todoID);
      dataProcessor.setLocalStorage();

      e.target.parentNode.classList.toggle(`true`);
    }
    //show edit form
    if (e.target.className === `edit-todo`) {
      const todoID = +e.target.parentNode.id;
      const parentEle = e.target.parentNode;

      renderProject.showEditForm(todoID, projectBelongTo, parentEle);
    }
    //cancel todo edition
    if (e.target.classList[1] === `button-cancelUpdate`) {
      const todoID = +e.target.parentNode.id;
      const parentEle = e.target.parentNode;
      renderProject.hideEditForm(todoID, parentEle);
    }
    // update todo
    if (e.target.classList[1] === `button-update`) {
      const todoID = +e.target.parentNode.id;

      const updateNameInput = document.querySelector(`#update-todo-name`);
      const updateDescriptionInput =
        document.querySelector(`#update-todo-note`);
      const updateDateInput = document.querySelector(`#update-todo-date`);
      const updatePriorityInput = document.querySelector(
        `#update-todo-priority`
      );
      const validEleUpdate = document.querySelector(`.errorMsg-date-update`);

      const updateInfo = [
        updateNameInput.value,
        updateDescriptionInput.value,
        updateDateInput.value,
        updatePriorityInput.value,
      ];

      const isGood = renderProject.validateDateUpdate(
        updateDateInput.value,
        validEleUpdate
      );
      if (isGood === false) return;

      dataProcessor.updateTodo(todoID, updateInfo);
      dataProcessor.setLocalStorage();

      const project = dataProcessor.getTodo(todoID, `Inbox`)[0].projectBelongTo;

      renderProject.renderTodoList(project);
    }
  });

  inboxBtn.addEventListener(`click`, function () {
    dataProcessor.sortTodoByDate(`Inbox`);
    dataProcessor.setLocalStorage();
    addTodoBtn.classList.remove(`hidden`);
    renderProject.renderTodoList(`Inbox`);
  });

  todayBtn.addEventListener(`click`, function () {
    dataProcessor.updateTodayProject();
    dataProcessor.updateUpcomingProject();
    dataProcessor.sortTodoByDate(`Today`);
    dataProcessor.setLocalStorage();
    renderProject.renderTodoList(`Today`);
    addTodoBtn.classList.add(`hidden`);
  });

  upcomingBtn.addEventListener(`click`, function () {
    dataProcessor.updateTodayProject();
    dataProcessor.updateUpcomingProject();
    dataProcessor.sortTodoByDate(`Upcoming`);
    dataProcessor.setLocalStorage();
    renderProject.renderTodoList(`Upcoming`);
    addTodoBtn.classList.add(`hidden`);
  });
})();
