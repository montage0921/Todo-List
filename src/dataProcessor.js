import { isToday, isFuture } from "date-fns";

export const dataProcessor = (function () {
  const projectObj = {
    Inbox: [],
    Today: [],
    Upcoming: [],
  };

  class Todo {
    constructor(name, description, date, priority, projectBelongTo) {
      (this.name = name), (this.description = description), (this.date = date);
      this.priority = priority;
      this.id = Date.now();
      this.isFinished = false;
      this.projectBelongTo = projectBelongTo;
    }
  }

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

  function createTodo(name, description, date, priority, projectBelongTo) {
    const todo = new Todo(name, description, date, priority, projectBelongTo);

    return todo;
  }

  function addTodo(name, description, date, priority, projectBelongTo) {
    const todo = createTodo(name, description, date, priority, projectBelongTo);
    const isoDate = new Date(date.replace(/-/g, "/"));

    projectObj[projectBelongTo].push(todo);

    for (const prop in projectObj) {
      if (prop !== projectBelongTo) {
        if (prop === `Inbox`) projectObj.Inbox.push(todo);
        if (isToday(isoDate) === true && prop === `Today`)
          projectObj.Today.push(todo);
        else if (isFuture(isoDate) === true && prop === `Upcoming`)
          projectObj.Upcoming.push(todo);
      }
    }

    console.log(projectObj);
  }

  function getProperty(projectName) {
    return projectObj[projectName];
  }

  function deleteTodo(id) {
    for (const prop in projectObj) {
      projectObj[prop].forEach((obj, i) => {
        if (obj.id === id) {
          projectObj[prop].splice(i, 1);
        }
      });
    }
  }

  return {
    addProject,
    getPropertyName,
    removeProject,
    addTodo,
    getProperty,
    deleteTodo,
  };
})();
