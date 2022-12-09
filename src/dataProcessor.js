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
    const allTodoID = projectObj[project].map((todo) => todo.id);
    delete projectObj[project];

    for (const prop in projectObj) {
      allTodoID.forEach((id) => {
        projectObj[prop].forEach((todo, i) => {
          if (todo.id == id) projectObj[prop].splice(i);
        });
      });
    }
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

  function updateFinish(isChecked, id) {
    for (const prop in projectObj) {
      projectObj[prop].forEach((obj, i) => {
        if (obj.id === id) {
          projectObj[prop][i].isFinished = isChecked;
        }
      });
    }
  }

  function getTodo(id, projectBelongTo) {
    return projectObj[projectBelongTo].filter((ele) => ele.id === id);
  }

  function updateTodo(id, updateInfo) {
    for (const prop in projectObj) {
      projectObj[prop].forEach((obj) => {
        if (obj.id === id) {
          (obj.name = updateInfo[0]), (obj.description = updateInfo[1]);
          obj.date = updateInfo[2];
          obj.priority = updateInfo[3];
        }
      });
    }

    updateTodayProject();
    updateUpcomingProject();
  }

  function updateTodayProject() {
    projectObj.Today.forEach((todo, i) => {
      const isoDate = new Date(todo.date.replace(/-/g, "/"));
      if (isToday(isoDate) === false) {
        if (isFuture(isoDate) === true) {
          projectObj.Upcoming.push(todo);
          projectObj.Today.splice(i);
        } else projectObj.Today.splice(i);
      }
    });
  }

  function updateUpcomingProject() {
    projectObj.Upcoming.forEach((todo, i) => {
      const isoDate = new Date(todo.date.replace(/-/g, "/"));
      if (isFuture(isoDate) === false) {
        if (isToday(isoDate) === true) {
          projectObj.Today.push(todo);
          projectObj.Upcoming.splice(i);
        } else projectObj.Upcoming.splice(i);
      }
    });
  }

  function sortTodoByDate(project) {
    projectObj[project].sort((a, b) => {
      const isoA = new Date(a.date.replace(/-/g, "/"));
      const isoB = new Date(b.date.replace(/-/g, "/"));
      if (isoA < isoB) return -1;
      else if (isoA > isoB) return 1;
      else if (isoA === isoB) return -1;
    });
  }

  return {
    addProject,
    getPropertyName,
    removeProject,
    addTodo,
    getProperty,
    deleteTodo,
    updateFinish,
    getTodo,
    updateTodo,
    updateTodayProject,
    updateUpcomingProject,
    sortTodoByDate,
  };
})();
