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

        get getIcon() {
            return this._icon;
        }

    }

    const projectList = [new Project('sports', 'Sports schedule'), new Project('book', 'Reading schedule')];

    function addProject(icon, title) {
        const project = new Project(icon, title);
        projectList.push(project);
        dom.changeProjectCounter(project.length);
        return project;
    }

    const getProjects = () => {
        return projectList;
    }


    const getProjectLength = () => projectList.length;

    return {addProject, getProjects, getProjectLength}
})();

export default projects;