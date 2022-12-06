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

////////////////////////////
const eventController = (function () {
  addProjectBtn.addEventListener(`click`, function () {
    renderProject.showProjectForm();
  });

  projectForm.addEventListener(`submit`, function (e) {
    e.preventDefault();

    const projectName = projectInput.value;

    dataProcessor.addProject(projectName);
  });

  hideProjectFormBtn.addEventListener(`click`, function () {
    projectInput.value = ``;
    renderProject.hideProjectForm();
  });
})();
