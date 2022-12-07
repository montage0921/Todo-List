import { projectForm } from ".";
import { todoForm } from ".";
import { inputArr } from ".";
import { projectContainer } from ".";
import { dataProcessor } from "./dataProcessor";

export const renderProject = (function () {
  const errorMsg = `The name is Repeated!`;
  const projectValidation = document.querySelector(`.errorMsg-Project`);

  const inboxIndicator = document.querySelector(`.whichProjectItis`);

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

  function renderValidationMsg(name) {
    const projectNameArr = dataProcessor.getPropertyName();

    let isRepeated = projectNameArr.some((projectName) => projectName === name);

    if (isRepeated) {
      projectValidation.textContent = errorMsg;
    } else projectValidation.textContent = ``;

    return isRepeated;
  }

  function renderTodoList(project) {
    inboxIndicator.textContent = project;
  }

  function showTodoForm() {
    todoForm.classList.remove(`hidden`);
  }

  function hideTodoForm() {
    todoForm.classList.add(`hidden`);
  }

  return {
    showProjectForm,
    hideProjectForm,
    renderProjectList,
    renderValidationMsg,
    renderTodoList,
    showTodoForm,
    hideTodoForm,
  };
})();
