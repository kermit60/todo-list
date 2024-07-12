import dom from './dom';

const projects = (() => {
    let projectList = [];
    
    class Project {
        constructor (icon, title) {
            this.icon = icon;
            this.title = title;
            
        }
    }
    
    function addProject(icon, title) {
        const project = new Project(icon, title);
        projectList.push(project);
        dom.changeProjectCounter(project.length);
        return project;
    }

    const getProjects = () => {
        return projectList;
    }

    return {addProject, getProjects}
})();

export default projects;