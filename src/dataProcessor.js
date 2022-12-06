export const dataProcessor = (function () {
  const projectObj = {
    inbox: [],
    today: [],
    future: [],
  };

  function addProject(name) {
    projectObj[name] = [];
    console.log(projectObj);
  }

  return { addProject };
})();
