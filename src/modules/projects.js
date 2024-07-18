import dom from './dom';

const projects = (() => {
    
    class Project {
        constructor (icon, title) {
            this._icon = icon;
            this._title = title;
        }

        get getTitle() {
            return this._title;
        }

        set newTitle(nTitle) {
            this._title = nTitle;
        }

        get getIcon() {
            return this._icon;
        }

        set newIcon(nIcon) {
            this._icon = nIcon;
        }

    }

    const projectList = [new Project('sports', 'Sports schedule'), new Project('book', 'Reading schedule')];

    function addProject(icon, title) {
        const project = new Project(icon, title);
        projectList.push(project);
        dom.changeProjectCounter(project.length);
        return project;
    }

    // Returns the index of the project
    function removeProject(id) {
        console.log('BEFORE REMOVAL', projectList);
        projectList.splice(id, 1);
        console.log('BEFORE REMOVAL, ', projectList);
    }

    function editProject(id, title, icon) {
        console.log('enter editProject method');
        const project = projectList[id];
        project.newTitle = title;
        project.newIcon = icon;
    }

    const getProjects = () => {
        return projectList;
    }


    const getProjectLength = () => projectList.length;

    return {addProject, removeProject, editProject, getProjects, getProjectLength}
})();

export default projects;