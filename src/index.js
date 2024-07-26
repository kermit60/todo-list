import './style.css';
import dom from './modules/dom';
import projects from './modules/projects';
import tasks from './modules/tasks';

const taskList = document.querySelector('#task-list');
dom.loadTasks(tasks.getMenuTasks('all'), taskList);
dom.changeTaskCounter(tasks.getMenuTasksLength('all'));
dom.loadProjects(projects.getProjects());

console.log('the live reloading does work')