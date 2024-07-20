import dom from './dom';

const projects = (() => {
    let projectList = [];
    class Project {
        constructor (icon, title) {
            this._icon = icon;
            this._title = title;
        }

        get title() {
            return this._title;
        }

        set newTitle(nTitle) {
            this._title = nTitle;
        }

        get icon() {
            return this._icon;
        }

        set newIcon(nIcon) {
            this._icon = nIcon;
        }

    }

    if (localStorage.getItem('projects') === null) {
        console.log('local storage is NULL')
        projectList = [new Project('sports', 'Sports schedule'), new Project('book', 'Reading schedule')]
        console.log(projectList);
    } else {
        console.log('THIS IS NOT NULL');
        const projectsFromStorage = JSON.parse(localStorage.getItem('projects'));
        projectList = projectsFromStorage;
    }


    function addProject(icon, title) {
        const project = new Project(icon, title);
        projectList.push(project);
        dom.changeProjectCounter(project.length);
        localStorage.setItem('projects', JSON.stringify(projectList));

        return project;
    }

    // Returns the index of the project
    function removeProject(id) {
        console.log('BEFORE REMOVAL', projectList);
        projectList.splice(id, 1);
        console.log('BEFORE REMOVAL, ', projectList);
        localStorage.setItem('projects', JSON.stringify(projectList));
    }

    function editProject(id, title, icon) {
        console.log('enter editProject method');
        const project = projectList[id];
        project.newTitle = title;
        project.newIcon = icon;
        localStorage.setItem('projects', JSON.stringify(projectList));
    }

    const getProjects = () => {
        return projectList;
    }

    const getProjectLength = () => projectList.length;

    return {addProject, removeProject, editProject, getProjects, getProjectLength}
})();

export default projects;