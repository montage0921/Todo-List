export const dataProcessor = (function () {
  const projectObj = {
    Inbox: [],
    Today: [],
    Upcoming: [],
  };

  function addProject(name) {
    projectObj[name] = [];
  }

  function getPropertyName() {
    const propNameArr = [];
    for (const prop in projectObj) {
      if (prop !== `Inbox` && prop !== `Today` && prop !== `Upcoming`)
        propNameArr.push(prop);
    }
    return propNameArr;
  }

  function removeProject(project) {
    delete projectObj[project];
  }

  return { addProject, getPropertyName, removeProject };
})();
