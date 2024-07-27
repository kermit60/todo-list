import {format, isThisWeek} from "date-fns";

const tasks = (() => {
    class Task {
        constructor(title, description, dueDate, priority) {
            this._title = title;
            this._description = description;
            this._dueDate = dueDate;
            this._priority = priority;
            this._checked = false;
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
    let completedTasks = [];

    const menuArrDict = {
        all: allTasks,
        today: todayTasks,
        week: weekTasks,
        important: importantTasks,
        completed: completedTasks
    } 

    const setIds = () => {
        projectTasks.forEach((arr, projectId) => {
            arr.forEach((task, taskId) => {
                task._projectId = projectId;
                task._taskId = taskId;
            });
        });
    }

    const getMenuTasks = (menu) => {
        projectTasks = JSON.parse(localStorage.getItem('tasks'));
        setIds();
        menuArrDict[menu] = [];
        const todaysDate = format(new Date(), "yyyy-MM-dd");
        
        if (menu === 'all') {
            // CHANGE TO INDEXES AND ADD NEW PROPERTIES FOR IDS
            projectTasks.forEach((arr) => {
                arr.forEach((task) => {
                    menuArrDict[menu].push(task);
                });
            });
        } else if (menu === 'today') {
            projectTasks.forEach(arr => {
                for (const task of arr) {
                    if (task._dueDate === todaysDate) {
                        menuArrDict[menu].push(task);
                    }
                    
                }
            });
        } else if (menu === 'week') {
            projectTasks.forEach(arr => {
                for (const task of arr) {
                    if (isThisWeek(task._dueDate)) {
                        menuArrDict[menu].push(task);
                    }
                    
                }
            });
        } else if (menu === 'important') {
            projectTasks.forEach(arr => {
                for (const task of arr) {
                    if (task._priority === 'important') {
                        menuArrDict[menu].push(task);
                    }
                }
            });
        } else {
            projectTasks.forEach(arr => {
                for (const task of arr) {
                    if (task._checked) {
                        menuArrDict[menu].push(task);
                    }
                }
            });
        }

        return menuArrDict[menu];
    }

    if (localStorage.getItem('tasks') === null) {
        console.log('TASKS local storage is NULL');
        projectTasks = [[new Task('testing1',  'description1', '2024-07-17', 'not-important'), new Task('testing1',  'description1', '2024-07-17', 'not-important'), new Task('testing1',  'description1', '2024-07-17', 'not-important')],
        [new Task('testing2',  'description2', '2024-07-17', 'not-important'), new Task('testing2',  'description2', '2024-07-17', 'not-important')],
        [new Task('testing3',  'description3', '2024-07-17', 'important')]
        ];

        localStorage.setItem('tasks', JSON.stringify(projectTasks));
        setIds();
    } else {
        const taskStorage = JSON.parse(localStorage.getItem('tasks'));
        projectTasks = taskStorage;
        setIds();
    }

    const addProjectTask = (title, description, dueDate, priority, id) => {
        const task = new Task(title, description, dueDate, priority);
        projectTasks[id].push(task);
        setIds();
        localStorage.setItem('tasks', JSON.stringify(projectTasks));
        
    }

    const editProjectTask = (title, description, dueDate, priority, projectId, taskId) => {
        projectTasks = JSON.parse(localStorage.getItem('tasks'));
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
        setIds();
        localStorage.setItem('tasks', JSON.stringify(projectTasks));
    }

    const removeProject = (id) => {
        projectTasks.splice(id, 1);
        setIds();
        localStorage.setItem('tasks', JSON.stringify(projectTasks));
    }

    const addProject = () => {
        projectTasks = JSON.parse(localStorage.getItem('tasks'))
        console.log('ADDING A PROJECT BEFORE', projectTasks);
        projectTasks.push([]);
        console.log('ADDING A PROJECT AFTER', projectTasks);
        setIds();
        localStorage.setItem('tasks', JSON.stringify(projectTasks));
    }

    const removeProjectTask = (projectId, taskId) => {
        projectTasks = JSON.parse(localStorage.getItem('tasks'))
        console.log('REMOVED TASK', projectTasks[projectId][taskId]);
        projectTasks[projectId].splice(taskId, 1);
        setIds();
        localStorage.setItem('tasks', JSON.stringify(projectTasks));
    }

    const getProjectTask = (projectId, taskId) => {
        console.log('GETTING PROJECT TASK', projectTasks[projectId][taskId]);
        return projectTasks[projectId][taskId];
        
    }

   

    const getProjectTasks = (id) => {
        return projectTasks[id];
    }

    const getCompletedTasks = () => {
        projectTasks = JSON.parse(localStorage.getItem('tasks'));
        console.log(completedTasks);
        localStorage.setItem('tasks', JSON.stringify(projectTasks));
        return completedTasks;
    }

    const addCompleted = (projectId, taskId) => {
        projectTasks = JSON.parse(localStorage.getItem('tasks'));
        projectTasks[projectId][taskId]._checked = true;
        console.log('CHECKED', projectTasks[projectId][taskId]);
        setIds();
        localStorage.setItem('tasks', JSON.stringify(projectTasks));
    }

    const removeCompleted = (projectId, taskId) => {
        projectTasks = JSON.parse(localStorage.getItem('tasks'));
        projectTasks[projectId][taskId]._checked = false;
        console.log('REMOVED CHECK', projectTasks[projectId][taskId]);
        setIds();
        localStorage.setItem('tasks', JSON.stringify(projectTasks));
    }


    const getProjectTasksLength = (id) => {
        if (!projectTasks[id]) {
            console.log('THE PROJECT DOESNT EXIST');
            return;
        }
        return projectTasks[id].length;
    }

    const getMenuTasksLength = menu => {
        console.log(menuArrDict[menu].length);
        return menuArrDict[menu].length;
    }

    return {
        addProjectTask,
        removeProjectTask,
        addProject,
        addCompleted,
        removeProject,
        removeCompleted,
        editProjectTask,
        getProjectTasks,
        getProjectTask,
        getMenuTasks,
        getCompletedTasks,
        getProjectTasksLength,
        getMenuTasksLength,
        setIds
    }

})();

export default tasks;
