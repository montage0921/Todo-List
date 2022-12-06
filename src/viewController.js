import { projectForm } from ".";
import { projectContainer } from ".";
import { dataProcessor } from "./dataProcessor";

export const renderProject = (function () {
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
      <div class="project">${name}</div>
      <img class="project-delete" src="" alt="" />
    </div>
        `;
    });

    projectContainer.insertAdjacentHTML(`beforeend`, textHTML);
  }

  return { showProjectForm, hideProjectForm, renderProjectList };
})();
