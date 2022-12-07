// CSS Render
import "./style.css";

// import
import { renderProject } from "./viewController";
import { dataProcessor } from "./dataProcessor";

//QuerySelector
const addProjectBtn = document.querySelector("#add-project");
export const projectForm = document.querySelector(`#project-form`);

const projectInput = document.querySelector(`#project-form input`);

const hideProjectFormBtn = document.querySelector(`#project-cancel`);

export const projectContainer = document.querySelector(`.projectContainer`);

const projectBtns = document.querySelectorAll(`.project`);

////////////////////////////
const eventController = (function () {
  addProjectBtn.addEventListener(`click`, function () {
    renderProject.showProjectForm();
  });

  projectForm.addEventListener(`submit`, function (e) {
    e.preventDefault();

    const projectName = projectInput.value;

    const isRepeated = renderProject.renderValidationMsg(projectName);

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
    if (e.target.className === `project-delete`) {
      const project =
        e.target.parentNode.querySelector(`.project-name`).textContent;

      dataProcessor.removeProject(project);
      renderProject.renderProjectList();
    }
  });
})();
