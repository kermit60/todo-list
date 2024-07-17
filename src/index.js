import './style.css';
import dialog from './modules/handlers';
import dom from './modules/dom';
import handlers from './modules/handlers';
import projects from './modules/projects';


dom.loadProjects(projects.getProjects());

console.log('the live reloading does work')