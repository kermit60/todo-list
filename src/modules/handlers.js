import dom from "./dom";
import projects from "./projects";
import tasks from "./tasks";

const handlers = (() => {
  const formTitle = document.querySelector("#project-dialog .form-title");
  const dialogSaveButton = document.querySelector(".project-submit > input");
  const projectsTitle = document.querySelector(
    "#delete-form > .project-deletion-text > b"
  );
  const projectLinks = document.querySelector(".project-links");
  const mainContent = document.getElementById("main");
  const taskList = document.querySelector("#main > #task-list");

  const projectDialog = (() => {
    const dialogForm = document.querySelector("#project-dialog");
    const dialogCloseButton = document.querySelector(".close-dialog");
    const dialogShowButton = document.querySelector("#project-add-button");
    const dialogTitle = document.querySelector("#project-dialog .form-title");
    const icons = document.querySelectorAll(".project-icon");

    for (const icon of icons) {
      icon.addEventListener("click", () => {
        for (const icon of icons) {
          icon.classList.remove("icon-selected");
        }
        icon.classList.add("icon-selected");
      });
    }

    dialogSaveButton.addEventListener("click", () => {
      const submitInput = document.querySelector(
        "#project-form > .project-submit > input"
      );
      if (submitInput.value === "Add") {
        dom.resetSelected();
        dom.addProject();
        tasks.addProject();
      }
    });

    dialogCloseButton.addEventListener("click", (e) => {
      e.preventDefault();
      dom.resetProjectForm();
      dialogForm.close();
    });

    dialogShowButton.addEventListener("click", () => {
      dialogTitle.textContent = "Add project";
      dialogSaveButton.value = "Add";
      dom.resetProjectForm();
      dialogForm.showModal();
    });
  })();

  const menuLinks = (() => {
    const sidebarLinks = document.querySelectorAll(".link");

    for (let link of sidebarLinks) {
      // console.log('SIDEBAR LINKS', link);
      link.addEventListener("click", () => {
        reset();
        link.classList.add("selected");
        const linkIcon = link.dataset.icon;
        const linkTitle = linkIcon[0].toUpperCase() + linkIcon.substring(1);
        taskList.textContent = "";
        dom.changeTaskHeader(linkIcon, linkTitle);
        dom.loadTasks(tasks.getMenuTasks(linkIcon), taskList);
        taskList.setAttribute("data-task-list-element", linkIcon);
        dom.changeTaskCounter(tasks.getMenuTasksLength(linkIcon));
      });

      link.addEventListener("mouseover", () => {
        link.classList.add("selected-hover");
      });

      link.addEventListener("mouseout", () => {
        link.classList.remove("selected-hover");
      });
    }

    const reset = () => {
      const links = document.querySelectorAll(".link");
      for (let link of links) {
        link.classList.remove("selected");
      }
    };
    return { reset };
  })();

  const makeProjectHover = (project) => {
    project.addEventListener("click", (e) => {
      menuLinks.reset();
      project.classList.add("selected");
      // need to add the project IDS with the headers and stuff ids

      const projectId = project.childNodes[1].dataset.projectId;
      const p = projects.getProject(projectId);
      // console.log(p);
      dom.changeTaskHeader(p._icon, p._title, true, projectId);
      // LOADING THE TASKS

      // console.log('TASKLIST SSSS', taskList);
      taskList.textContent = "";
      tasks.setIds();
      dom.loadTasks(tasks.getProjectTasks(projectId), taskList);
      // change the tasks counter
      dom.changeTaskCounter(tasks.getProjectTasksLength(projectId));
      // dom.setTaskIds();
    });

    project.addEventListener("mouseover", () => {
      project.classList.add("selected-hover");
    });

    project.addEventListener("mouseout", () => {
      project.classList.remove("selected-hover");
    });
  };

  // When you create something new handlers are created with it
  const makeDelete = (project, name = "") => {
    const dialogForm = document.querySelector("#delete-dialog");
    const element = project.dataset.element;
    const title = document.querySelector("#delete-dialog .form-title");
    const taskName = document.querySelector(".task-deletion-text > b");
    const projectName = document.querySelector(".project-deletion-text > b");
    const taskDelete = document.querySelector(".task-deletion-text");
    const projectDelete = document.querySelector(".project-deletion-text");
    const deleteProjectButton = document.querySelector(
      "#delete-form > .project-submit > input"
    );

    project.addEventListener("click", (e) => {
      // console.log(e.target.parentElement.dataset.projectId);

      // Alter title if project or task
      if (element === "project") {
        taskDelete.classList.add("hide");
        projectDelete.classList.remove("hide");
        projectName.textContent = name;
        title.textContent = "Delete Project";
      } else {
        projectDelete.classList.add("hide");
        taskDelete.classList.remove("hide");
        taskName.textContent = name;
        title.textContent = "Delete Task";
      }
      dialogForm.showModal();
    });

    deleteProjectButton.addEventListener("click", () => {
      // IF ITS A PROJECT DELETE OR NOT
      if (!projectDelete.classList.contains("hide")) {
        // using the .selected as a indicator of what's the id we can remove it from the DOM
        for (let i = 0; i < projectLinks.childNodes.length; ++i) {
          // console.log('WTF IS THIS', projectLinks.childNodes[i]);
          if (projectLinks.childNodes[i].classList.contains("selected")) {
            // console.log(projects.getProjects());
            // console.log('DELETING LINK', projectLinks.childNodes[i].childNodes[1].dataset.projectId)
            const id =
              projectLinks.childNodes[i].childNodes[1].dataset.projectId;
            projects.removeProject(id);
            projectLinks.removeChild(projectLinks.childNodes[i]);
            tasks.removeProject(id);
            break;
          }
        }

        dom.setProjectIds();
        dom.changeProjectCounter();
        // REDIRECT BACK TO THE ALL MENULINK (first menulink)
        menuLinks.reset();
        const links = document.querySelector("#menu-links");
        // console.log(links.childNodes[1]);
        links.childNodes[1].classList.add("selected");
        taskList.textContent = "";
        dom.loadTasks(tasks.getMenuTasks("all"), taskList);
        dom.changeTaskCounter(tasks.getMenuTasksLength("all"));
        dom.changeTaskHeader("all", "All");

        dialogForm.close();
      }
    });
  };

  const makeEdit = (project) => {
    const projectDialog = document.querySelector("#project-dialog");
    const taskDialog = document.querySelector("#task-dialog");
    const formTitle = document.querySelector("#project-dialog .form-title");
    const editIconButton = document.querySelector(
      "#project-form > .project-submit > input"
    );
    const projectIcons = document.querySelectorAll(".project-icon");
    const projectInput = document.querySelector("#project-title-value");

    const element = project.dataset.element;
    if (element === "project") {
      project.addEventListener("click", (e) => {
        const projectId = e.target.parentElement.dataset.projectId;

        const projectTitle =
          e.target.parentElement.previousElementSibling.lastChild.textContent;
        // THERE'S A WEIRD INTERACTION WITH _ICON AND ICON
        const projectIcon = projects.getProject(projectId).getIcon;

        // console.log(e.target.parentElement)
        // console.log(projectIcon);

        // presetting the form values to match the project values
        projectInput.value = projectTitle;
        dom.resetProjectIcons();
        for (const p of projectIcons) {
          if (p.dataset.icon === projectIcon) {
            p.classList.add("icon-selected");
          }
        }

        formTitle.textContent = "Edit project";
        editIconButton.value = "Edit";
        projectDialog.showModal();
      });

      // FIX FEATURE ON HOW TO EDIT THE PROJECTS
      editIconButton.addEventListener("click", () => {
        const newProjectTitle = projectInput.value ? projectInput.value : "";
        const projectLink = dom.findSelectedLink();
        const newProjectIcon = dom.findSelectedIcon();
        const projectProject = projectLink ? projectLink.project : "";
        const newProjectId = projectLink ? projectLink.id : -1;
        // console.log('whats the projectlink', projectLink);
        // console.log('Whats the type of projectlink', typeof projectLink);
        if (projectLink) {
          const newProjectLink = dom.createProject(
            newProjectTitle,
            newProjectIcon
          );
          newProjectLink.classList.add("icon-selected");
          // console.log(newProjectTitle, newProjectIcon, newProjectId, projectLink, newProjectLink);
          projects.editProject(newProjectId, newProjectTitle, newProjectIcon);
          projectLinks.replaceChild(newProjectLink, projectProject);

          // NEED TO CHANGE TASKHEADER

          dom.changeTaskHeader(
            newProjectIcon,
            newProjectTitle,
            true,
            newProjectId
          );
          dom.setProjectIds();
        }

        projectDialog.close();
      });
    } else {
      taskDialog.showModal();
    }
  };

  const addTaskDialog = (() => {
    const dialogForm = document.querySelector("#task-dialog");
    const dialogCloseButton = document.querySelector(".task-close-dialog");
    const dialogAddButton = document.querySelector(
      "#task-form > .task-submit > input"
    );
    const formTitle = document.querySelector("#task-dialog .form-title");
    const button = document.querySelector(".task-add-button");
    const addButton = document.querySelector(
      "#task-form > .task-submit > input"
    );

    // GETTING ALL THE VALUES NEEDED FOR THE FORM
    const titleInput = document.querySelector("#task-form  #title");
    const descriptionInput = document.querySelector("#task-form #description");
    const dueDateInput = document.querySelector("#task-form #dueDate");
    const priorityInput = document.querySelector("#task-form #priority");

    dialogAddButton.addEventListener("click", (e) => {
      const projectId = document.querySelector("#main > #task-list");
      const taskLink = document.querySelector("#main > #task-list");
      // task.addTask();
      const title = titleInput.value;
      const description = descriptionInput.value;
      const dueDate = dueDateInput.value;
      const priority = priorityInput.value;
      const id = projectId.dataset.projectId;
      // console.log(titleInput.value);
      // console.log(descriptionInput.value);
      // console.log(dueDateInput.value);
      // console.log(priorityInput.value);
      // IF THE INPUTS AREN'T EMPTY
      if (
        title &&
        description &&
        dueDate &&
        priority &&
        addButton.value === "Add"
      ) {
        tasks.addProjectTask(title, description, dueDate, priority, id);
        const task = dom.createTaskItem({
          _title: title,
          _description: description,
          _dueDate: dueDate,
          _priority: priority,
          _checked: false,
        });
        taskLink.appendChild(task);
        dom.changeTaskCounter(tasks.getProjectTasksLength(id));
        dom.setTaskIds();
      }
    });

    dialogCloseButton.addEventListener("click", (e) => {
      e.preventDefault();
      dialogForm.close();
    });

    button.addEventListener("click", () => {
      dom.resetTaskForm();
      formTitle.textContent = "Add Task";
      addButton.value = "Add";
      dialogForm.showModal();
    });
  })();

  // TASK HOVERING EFFECT
  const makeTasksHover = (taskItem) => {
    taskItem.addEventListener("click", () => {
      dom.resetTaskSelected();
      taskItem.classList.add("task-selected");
    });
  };

  const makeTaskDelete = (taskDeleteIcon, name = "") => {
    const deleteDialog = document.querySelector("#delete-dialog");
    const title = document.querySelector("#delete-dialog > .form-title");
    const taskName = document.querySelector(
      "#delete-form > .task-deletion-text > b"
    );
    const taskLabel = document.querySelector(".task-deletion-text");
    const deleteButton = document.querySelector(
      "#delete-form > .project-submit > input"
    );

    taskDeleteIcon.addEventListener("click", () => {
      document.querySelector(".project-deletion-text").classList.add("hide");
      taskLabel.classList.remove("hide");

      title.textContent = "Delete Task";
      taskName.textContent = name;

      deleteDialog.showModal();
    });

    deleteButton.addEventListener("click", (e) => {
      if (!taskLabel.classList.contains("hide")) {
        const taskItems = document.querySelectorAll(".task-item");
        for (const task of taskItems) {
          if (task.classList.contains("task-selected")) {
            const taskId = task.dataset.taskId;
            // console.log(task, taskId);

            tasks.removeProjectTask(task.dataset.projectId, taskId);
            taskList.removeChild(task);
            // FIX HEREEEEEE

            const projectId = taskList.dataset.projectId;
            const taskListElement = taskList.dataset.taskListElement;
            // console.log(taskList.dataset.taskListElement);
            const counter = projectId
              ? tasks.getProjectTasksLength(projectId)
              : tasks.getMenuTasks(taskListElement).length;

            dom.changeTaskCounter(counter);
            break;
          }
        }

        dom.setTaskIds();
      }
    });
  };

  const makeTaskEdit = (taskEditIcon) => {
    const dialogForm = document.querySelector("#task-dialog");
    const formTitle = document.querySelector("#task-dialog > .form-title");
    const dialogCloseButton = document.querySelector(".task-close-dialog");
    const dialogAddButton = document.querySelector(
      "#task-form > .task-submit > input"
    );
    const editButton = document.querySelector(
      "#task-form > .task-submit > input"
    );

    // GETTING ALL THE VALUES NEEDED FOR THE FORM
    const titleInput = document.querySelector("#task-form  #title");
    const descriptionInput = document.querySelector("#task-form #description");
    const dueDateInput = document.querySelector("#task-form #dueDate");
    const priorityInput = document.querySelector("#task-form #priority");

    taskEditIcon.addEventListener("click", (e) => {
      const taskItem = e.target.parentElement.parentElement;
      const taskItemId = taskItem.dataset.taskId;
      const projectId = taskItem.dataset.projectId;
      const task = tasks.getProjectTask(projectId, taskItemId);
      // console.log(taskItem);

      const title = task._title;
      const description = task._description;
      const dueDate = task._dueDate;
      const priority = task._priority;
      // console.log('AOSUFHAOUFHAOISFHASOIFH', title, description, dueDate, priority);

      titleInput.value = title;
      descriptionInput.value = description;
      dueDateInput.value = dueDate;
      priorityInput.value = priority;

      formTitle.textContent = "Edit Task";
      dialogAddButton.value = "Edit";
      dialogForm.showModal();
    });

    editButton.addEventListener("click", () => {
      // get the selected task so we can replace with
      const selectedTask = dom.findSelectedTask();
      const selectedTaskId = selectedTask ? selectedTask.dataset.taskId : "";
      const projectId = selectedTask ? selectedTask.dataset.projectId : "";
      // const selectedTaskDom = selectedTask ? selectedTask['task']: '';

      const title = titleInput.value;
      const description = descriptionInput.value;
      const dueDate = dueDateInput.value;
      const priority = priorityInput.value;
      // console.log('BITCHJ', selectedTask, selectedTaskId, projectId, title, description, dueDate, priority);
      if (title && description && dueDate && priority && selectedTask) {
        tasks.editProjectTask(
          title,
          description,
          dueDate,
          priority,
          projectId,
          selectedTaskId
        );
        const newTask = dom.createTaskItem(
          tasks.getProjectTask(projectId, selectedTaskId)
        );
        newTask.setAttribute("data-project-id", projectId);
        newTask.setAttribute("data-task-id", selectedTaskId);
        // console.log('NEW TASKKKK', newTask);
        newTask.classList.add("task-selected");
        taskList.replaceChild(newTask, selectedTask);
        // dom.setTaskIds();
        // tasks.setIds();
      }
    });
  };

  const makeInfo = (infoTaskIcon) => {
    const displayDialog = document.querySelector("#display-dialog");
    const closeButton = document.querySelector(
      "#display-dialog .task-submit > button"
    );
    const displayDescription = document.querySelectorAll(
      ".display-description"
    );

    infoTaskIcon.addEventListener("click", (e) => {
      const selectedTask = e.target.parentElement.parentElement;
      // console.log(selectedTask);
      // console.log(displayDescription);
      // get the selected task so we can replace with
      const selectedTaskId = selectedTask.dataset.taskId;
      const taskListId = selectedTask.dataset.projectId;
      const task = selectedTaskId
        ? tasks.getProjectTask(taskListId, selectedTaskId)
        : "";
      const project = projects.getProject(taskListId)._title;
      // console.log(task);

      displayDescription[0].textContent = task._title;
      displayDescription[1].textContent = task._description;
      displayDescription[2].textContent = task._dueDate;
      displayDescription[3].textContent = task._priority;
      displayDescription[4].textContent = project;

      displayDialog.showModal();
    });

    closeButton.addEventListener("click", (e) => {
      e.preventDefault();

      displayDialog.close();
    });
  };

  const checked = (checkbox) => {
    checkbox.addEventListener("click", (e) => {
      const task = e.target.parentElement.parentElement;
      const taskId = task.dataset.taskId;
      const projectId = task.dataset.projectId;

      // console.log(task, projectId, taskId);
      if (e.target.checked) {
        // ADD TO COMPLETED
        tasks.addCompleted(projectId, taskId);
        e.target.parentElement.classList.add("checked");
      } else {
        // REMOVE FROM COMPLETED
        tasks.removeCompleted(projectId, taskId);
        e.target.parentElement.classList.remove("checked");
      }
    });
  };

  return {
    makeProjectHover,
    makeTasksHover,
    makeDelete,
    makeTaskDelete,
    makeTaskEdit,
    makeEdit,
    makeInfo,
    checked,
    addTaskDialog,
  };
})();

export default handlers;
