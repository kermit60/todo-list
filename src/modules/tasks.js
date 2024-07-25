const tasks = (() => {
    class Task {
        constructor(title, description, dueDate, priority) {
            this._title = title;
            this._description = description;
            this._dueDate = dueDate;
            this._priority = priority;
        }

        getTitle() {
            return this._title;
        }

        setTitle(newTitle) {
            this._title = newTitle;
        }
        
        getDescription() {
            return this._description;
        }

        setDescription(newDescription) {
            this._description = newDescription;
        }
        
        getDueDate() {
            return this._dueDate;
        }
        setDueDate(newDueDate) {
            this._dueDate = newDueDate;
        }

        getPriority() {
            return this._priority;
        }

        setPriority(newPriority) {
            this._priority = newPriority;
        }

    }
    let projectTasks;

    let allTasks = [];
    let todayTasks = [];
    let weekTasks = [];
    let importantTasks = [];
    let completedTask = [];

    const menuArrDict = {
        all: allTasks,
        today: todayTasks,
        week: weekTasks,
        important: importantTasks,
        completed: completedTask
    } 

    if (localStorage.getItem('tasks') === null) {
        console.log('TASKS local storage is NULL');
        projectTasks = [[new Task('testing1',  'description1', '2024-07-17', 'not-important'), new Task('testing1',  'description1', '2024-07-17', 'not-important'), new Task('testing1',  'description1', '2024-07-17', 'not-important')],
        [new Task('testing2',  'description2', '2024-07-17', 'not-important'), new Task('testing2',  'description2', '2024-07-17', 'not-important')],
        [new Task('testing3',  'description3', '2024-07-17', 'important')]
        ];
        localStorage.setItem('tasks', JSON.stringify(projectTasks));
    } else {
        const taskStorage = JSON.parse(localStorage.getItem('tasks'));
        projectTasks = taskStorage;
    }

    const addProjectTask = (title, description, dueDate, priority, id) => {
        const task = new Task(title, description, dueDate, priority);
        projectTasks[id].push(task);
        localStorage.setItem('tasks', JSON.stringify(projectTasks));
    }

    const editProjectTask = (title, description, dueDate, priority, projectId, taskId) => {
        projectTasks = JSON.parse(localStorage.getItem('tasks'))
        console.log('EDITING TASK');
        /*
            CLASSIC WITH CLASS EDITING
            projectTasks[projectId][taskId].setTitle(title);
            projectTasks[projectId][taskId].setDescription(description);
            projectTasks[projectId][taskId].setDueDate(dueDate);
            projectTasks[projectId][taskId].setPriority(priority);
        */
        projectTasks[projectId][taskId]._title = title;
        projectTasks[projectId][taskId]._description = description;
        projectTasks[projectId][taskId]._dueDate = dueDate;
        projectTasks[projectId][taskId]._priority = priority;
        console.log('NEW EDITED PROJECT LIST', projectTasks[projectId]);
        localStorage.setItem('tasks', JSON.stringify(projectTasks));
    }

    const removeProject = (id) => {
        projectTasks.splice(id, 1);
        localStorage.setItem('tasks', JSON.stringify(projectTasks));
    }

    const addProject = () => {
        projectTasks = JSON.parse(localStorage.getItem('tasks'))
        console.log('ADDING A PROJECT BEFORE', projectTasks);
        projectTasks.push([]);
        console.log('ADDING A PROJECT AFTER', projectTasks);
        localStorage.setItem('tasks', JSON.stringify(projectTasks));
    }

    const removeProjectTask = (projectId, taskId) => {
        projectTasks = JSON.parse(localStorage.getItem('tasks'))
        console.log('REMOVED TASK', projectTasks[projectId][taskId]);
        projectTasks[projectId].splice(taskId, 1);
        localStorage.setItem('tasks', JSON.stringify(projectTasks));
    }

    const getProjectTask = (projectId, taskId) => {
        console.log('GETTING PROJECT TASK', projectTasks[projectId][taskId]);
        return projectTasks[projectId][taskId];
        
    }

    const getMenuTasks = (menu) => {
        return menuArrDict[menu];
    }

    const getProjectTasks = (id) => {
        return projectTasks[id];
    }

    

    const getProjectTasksLength = (id) => {
        if (!projectTasks[id]) {
            console.log('THE PROJECT DOESNT EXIST');
            return;
        }
        return projectTasks[id].length;
    }

    const getMenuTasksLength = menu => {
        return menuArrDict[menu].length;
    }

    return {
        addProjectTask,
        removeProjectTask,
        addProject,
        removeProject,
        editProjectTask,
        getProjectTasks,
        getProjectTask,
        getMenuTasks,
        getProjectTasksLength,
        getMenuTasksLength
    }

})();

export default tasks;
