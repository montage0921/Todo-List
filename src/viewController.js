import { projectForm } from ".";
import { projectContainer } from ".";
import { dataProcessor } from "./dataProcessor";

export const renderProject = (function () {
  const errorMsg = `The name is Repeated!`;

  const projectValidation = document.querySelector(`.errorMsg-Project`);

  function showProjectForm() {
    projectForm.classList.remove(`hidden`);
  }

  function hideProjectForm() {
    projectForm.classList.add(`hidden`);
  }

  function renderProjectList() {
    let textHTML = ``;

    const projectNameArr = dataProcessor.getPropertyName();

    projectNameArr.forEach((name) => {
      textHTML = ``;

      textHTML += `
      <div class="project">
      <img class="project-icon" src="" alt="" />
      <div class="project-name">${name}</div>
      <img class="project-delete" src="" alt="" />
    </div>
        `;
    });

    projectContainer.insertAdjacentHTML(`beforeend`, textHTML);
  }

  function renderValidationMsg(name) {
    const projectNameArr = dataProcessor.getPropertyName();

    let isRepeated = projectNameArr.some((projectName) => projectName === name);

    if (isRepeated) {
      projectValidation.textContent = errorMsg;
    } else projectValidation.textContent = ``;

    return isRepeated;
  }

  return {
    showProjectForm,
    hideProjectForm,
    renderProjectList,
    renderValidationMsg,
  };
})();
