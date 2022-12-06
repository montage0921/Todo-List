import { projectForm } from ".";

export const renderProject = (function () {
  function showProjectForm() {
    projectForm.classList.remove(`hidden`);
  }

  function hideProjectForm() {
    projectForm.classList.add(`hidden`);
  }

  return { showProjectForm, hideProjectForm };
})();
