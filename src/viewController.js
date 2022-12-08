import { projectForm } from ".";
import { todoForm } from ".";
import { inputArr } from ".";
import { projectContainer } from ".";
import { dataProcessor } from "./dataProcessor";
import { isToday, isFuture } from "date-fns";

export const renderProject = (function () {
  const errorMsg = `The name is Repeated!`;
  const errorMsgDate = `Start date cannot be in the past`;
  const projectValidation = document.querySelector(`.errorMsg-Project`);

  const inboxIndicator = document.querySelector(`.whichProjectItis`);

  const todoValidation = document.querySelector(`.errorMsg-Todo`);
  const dateValidation = document.querySelector(`.errorMsg-Date`);
  const todoContainer = document.querySelector(`.todoContainer`);

  function showProjectForm() {
    projectForm.classList.remove(`hidden`);
  }

  function hideProjectForm() {
    projectForm.classList.add(`hidden`);
  }

  function renderProjectList() {
    projectContainer.innerHTML = ``;
    let textHTML;

    const projectNameArr = dataProcessor.getPropertyName();

    if (projectNameArr.length === 0) textHTML = ``;
    else {
      projectNameArr.forEach((name) => {
        textHTML = ``;

        textHTML += `
            <div class="project">
            <img class="project-icon" src="" alt="" />
            <div class="project-name">${name}</div>
            <img class="project-delete" src="" alt="" />
          </div>
              `;
        projectContainer.insertAdjacentHTML(`beforeend`, textHTML);
      });
    }
  }

  function validateProjectMsg(name) {
    const projectNameArr = dataProcessor.getPropertyName();

    let isRepeated = projectNameArr.some((projectName) => projectName === name);

    if (isRepeated) {
      projectValidation.textContent = errorMsg;
    } else projectValidation.textContent = ``;

    return isRepeated;
  }

  function showTodoForm() {
    todoForm.classList.remove(`hidden`);
  }

  function clearTodoFormInput() {
    inputArr.forEach((input) => (input.value = ``));
  }

  function hideTodoForm() {
    clearTodoFormInput();
    todoForm.classList.add(`hidden`);
  }

  function isTodayOrFuture(date) {
    const isoDate = new Date(date.replace(/-/g, "/"));

    const todayTodo = isToday(isoDate);
    const futureTodo = isFuture(isoDate);

    return { todayTodo, futureTodo };
  }

  function validateTodoMsg(date) {
    const obj = isTodayOrFuture(date);

    let isGood;

    if (obj.todayTodo === false && obj.futureTodo === false) {
      dateValidation.textContent = errorMsgDate;
      isGood = false;
    } else {
      dateValidation.textContent = ``;
      isGood = true;
    }

    return isGood;
  }

  function renderTodoList(project) {
    todoContainer.innerHTML = ``;
    inboxIndicator.textContent = project;
    let textHTML = ``;
    const todoArr = dataProcessor.getProperty(project);

    if (todoArr.length === 0) textHTML = ``;

    todoArr.forEach((todo) => {
      textHTML += `
     
        <div class="todo ${todo.priority} " id=${todo.id}>
          <input type="checkbox" name="" id="" class="checkbox" />
          <span class="title"><b>${todo.name}</b> </span>

          <span class="discription"
            ><i
              >${todo.description}</i
            >
          </span>
          <span class="priority ${todo.priority}">${todo.priority}</span>
          <span class="project-belongTo">${todo.projectBelongTo}</span>
          <span class="date">${todo.date}</span>
          <img src="" alt="" class="edit-todo" />
          <img src="" alt="" class="delete-todo" />
       </div>
      `;
    });

    todoContainer.insertAdjacentHTML(`afterbegin`, textHTML);
  }

  function showEditForm(todoID, projectBelongTo, parentEle) {
    const todo = dataProcessor.getTodo(todoID, projectBelongTo);
    // parentEle.classList.add(`hidden`);

    if (parentEle.nextElementSibling !== null) {
      if (parentEle.nextElementSibling.className === `editTodo-form`) {
        parentEle.nextElementSibling.remove();
      }
    }

    const formHTMLText = `
     <form class="editTodo-form" id=${todo[0].id}>
          <div class="inputDiv">
            <label for="todo-name">Name: </label>
            <input id="todo-name" type="text" required value="${
              todo[0].name
            }" />
            <div class="errorMsg-Todo"></div>
          </div>

          <div class="inputDiv">
            <label for="todo-note">Note: </label>
            <input id="todo-note" type="text" required maxlength="70" value="${
              todo[0].description
            }"/>
          </div>

          <div class="inputDiv">
            <div class="errorMsg-Date"></div>
            <label for="todo-date">Date: </label>
            <input id="todo-date" type="date" required value="${
              todo[0].date
            }" />
          </div>

          <select name="priority" id="priority">
            <optgroup label="Priority"></optgroup>
            <option value="Important" ${
              todo[0].priority === `Important` ? `selected` : ``
            }>Important</option>
            <option value="Normal" ${
              todo[0].priority === `Normal` ? `selected` : ``
            }>Normal</option>
            <option value="Easy" ${
              todo[0].priority === `Easy` ? `selected` : ``
            }>Casual</option>
          </select>

          <input type="submit" value="Update" class="button button-update" />
          <input type="button" value="Cancel" class="button button-cancelUpdate" />
        </form>
    `;

    parentEle.insertAdjacentHTML(`afterend`, formHTMLText);
  }

  function hideEditForm(todoID, parentEle) {
    const eleArr = Array.from(parentEle.parentNode.children);

    const theForm = eleArr.filter(
      (ele) => +ele.id === todoID && ele.className === `editTodo-form`
    )[0];

    parentEle.remove(theForm);
  }

  return {
    showProjectForm,
    hideProjectForm,
    renderProjectList,
    validateProjectMsg,
    renderTodoList,
    showTodoForm,
    hideTodoForm,
    validateTodoMsg,
    showEditForm,
    hideEditForm,
  };
})();
