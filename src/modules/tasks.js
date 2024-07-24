const tasks = (() => {
    class Task {
        constructor(title, description, dueDate, priority) {
            this.title = title;
            this.description = description;
            this.dueDate = dueDate;
            this.priority = priority;
        }

        getTitle() {
            return this.title;
        }

        setTitle(newTitle) {
            this.title = newTitle;
        }
        
        getDescription() {
            return this.title;
        }

        setDescription(newTitle) {
            this.title = newTitle;
        }
        
        getDueDate() {
            return this.dueDate;
        }
        setDueDate(newDueDate) {
            this.dueDate = newDueDate;
        }

        getPriority() {
            return this.priority;
        }

        setPriority(newPriority) {
            this.priority = newPriority;
        }

    }
    // indexed projects have it's task storages
    let projectTasks = [[new Task('testing1',  'description1', '2024-07-17', 'test priority1'), new Task('testing1',  'description1', '2024-07-17', 'test priority1'), new Task('testing1',  'description1', '2024-07-17', 'test priority1')],
                    [new Task('testing2',  'description2', '2024-07-17', 'test priority2'), new Task('testing2',  'description2', '2024-07-17', 'test priority2')],
                    [new Task('testing3',  'description3', '2024-07-17', 'test priority3')]
                    ];

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


    }

    const addProjectTask = (title, description, dueDate, priority, id) => {
        const task = new Task(title, description, dueDate, priority);
        projectTasks[id].push(task);

    }

    const removeProject = (id) => {
        projectTasks.splice(id, 1);

    }

    const addProject = () => {
        projectTasks.push([]);
    }

    const removeProjectTask = (projectId, taskId) => {
        console.log('REMOVED TASK', projectTasks[projectId][taskId]);
        projectTasks[projectId].splice(taskId, 1);
        
    }

    const getMenuTasks = (menu) => {
        return menuArrDict[menu];
    }

    const getProjectTasks = (id) => {
        return projectTasks[id];
    }

    const getProjectTasksLength = (id) => {
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
        getProjectTasks,
        getMenuTasks,
        getProjectTasksLength,
        getMenuTasksLength
    }

})();

export default tasks;
