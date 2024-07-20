import FamilyIcon from '../assets/family-icon.svg';
import FoodIcon from '../assets/food-icon.svg';
import GiftIcon from '../assets/gift-icon.svg';
import ShoppingIcon from '../assets/shopping-icon.svg';
import SportsIcon from '../assets/sports-icon.svg';
import BookIcon from '../assets/book-icon.svg';
import EditIcon from '../assets/edit-icon.svg';
import DeleteIcon from '../assets/delete-icon.svg';
import AllIcon from '../assets/all-icon.svg';
import TodayIcon from '../assets/today-icon.svg';
import WeekIcon from '../assets/week-icon.svg';
import ImportantIcon from '../assets/important-icon.svg';
import CompleteIcon from '../assets/completed-icon.svg';
import AddIcon from '../assets/add-circle.svg'

import projects from './projects';
import tasks from './tasks';
import handlers from './handlers';


const dom = (() => {
    // project sidebars
    const menuProjects = document.getElementById('menu-projects');
    const projectLinks = document.querySelector('.project-links');
    const projectCounter = document.querySelector('.project-title > p');
    const projectIconList = document.querySelectorAll('.project-icon');
    const projectTitle = document.querySelector('#project-title-value');

    const iconList = {
        book: BookIcon,
        family: FamilyIcon,
        food: FoodIcon,
        gift: GiftIcon,
        shopping: ShoppingIcon,
        sports: SportsIcon,
        all: AllIcon,
        today: TodayIcon,
        week: WeekIcon,
        important: ImportantIcon,
        completed: CompleteIcon
    }

    const createProject = (title, icon) => {
        const pTitle = title;

        // if there's no value for title, don't make it
        if (!pTitle) {
            return;
        }

        const pIcon = icon;

        // building the project in the dom
        const link = document.createElement('a');
        const projectContent = document.createElement('div');
        const projectEdit = document.createElement('div');
        const projecttitle = document.createElement('p');
        const projectIcon = new Image();
        const editIcon = new Image();
        const deleteIcon = new Image();
        //  GETTING PROJECT ELEMENTS READY
        link.setAttribute('href', '#');
        link.classList.add('project-link', 'link');

        projectContent.classList.add('project-content');
        projectEdit.classList.add('project-edit');

        projecttitle.classList.add('menu-link-title');
        projecttitle.textContent = pTitle;

        projectIcon.src = iconList[pIcon];
        projectIcon.setAttribute('alt', 'project-icon');

        editIcon.src = EditIcon;
        editIcon.setAttribute('alt', 'edit icon');
        editIcon.classList.add('edit-project');
        editIcon.setAttribute('data-element', 'project');
        handlers.makeEdit(editIcon);

        deleteIcon.src = DeleteIcon;
        deleteIcon.setAttribute('alt', 'delete icon');
        deleteIcon.classList.add('delete-project');
        deleteIcon.setAttribute('data-element', 'project');
        handlers.makeDelete(deleteIcon, pTitle);

        // ASSEMBLING PROJECT ELEMENTS
        projectContent.appendChild(projectIcon);
        projectContent.appendChild(projecttitle);

        projectEdit.appendChild(editIcon);
        projectEdit.appendChild(deleteIcon);
        

        link.appendChild(projectContent);
        link.appendChild(projectEdit);
        // add event handlers for the new 
        handlers.makeProjectHover(link);
        
        return link;
    }

    const findSelectedIcon = () => {
        for (const projectIcons of projectIconList) {
            if (projectIcons.classList.contains('icon-selected')) {
                return projectIcons.dataset.icon;
            } 
        }
        return 'book';
    }

    const addProject = () => {
        const title = projectTitle.value;

        // if there's no value for title, don't make it
        if (!title) {
            return;
        }

        

        const icon = findSelectedIcon();

        // building the project in the dom
        const link = document.createElement('a');
        const projectContent = document.createElement('div');
        const projectEdit = document.createElement('div');
        const projecttitle = document.createElement('p');
        const projectIcon = new Image();
        const editIcon = new Image();
        const deleteIcon = new Image();
        //  GETTING PROJECT ELEMENTS READY
        link.setAttribute('href', '#');
        link.classList.add('project-link', 'link', 'selected');

        projectContent.classList.add('project-content');
        projectEdit.classList.add('project-edit');

        projecttitle.classList.add('menu-link-title');
        projecttitle.textContent = title;

        projectIcon.src = iconList[icon];
        projectIcon.setAttribute('alt', 'project-icon');

        editIcon.src = EditIcon;
        editIcon.setAttribute('alt', 'edit icon');
        editIcon.classList.add('edit-project');
        editIcon.setAttribute('data-element', 'project');
        handlers.makeEdit(editIcon);

        deleteIcon.src = DeleteIcon;
        deleteIcon.setAttribute('alt', 'delete icon');
        deleteIcon.classList.add('delete-project');
        deleteIcon.setAttribute('data-element', 'project');
        handlers.makeDelete(deleteIcon, title);

        // ASSEMBLING PROJECT ELEMENTS
        projectContent.appendChild(projectIcon);
        projectContent.appendChild(projecttitle);

        projectEdit.appendChild(editIcon);
        projectEdit.appendChild(deleteIcon);

        link.appendChild(projectContent);
        link.appendChild(projectEdit);
        // add event handlers for the new 
        handlers.makeProjectHover(link);

        const project = projects.addProject(icon, title);
        
        console.log('created project: ', project);
        console.log('New project array', projects.getProjects());
        changeProjectCounter();
        projectLinks.appendChild(link);
        setProjectIds();
    }

    const loadProjects = (list) => {
        console.log('gets to loadProjects', list);
        projectLinks.textContent = '';
        for (const project of list) {
            // WHEN YOU CONVERT IT A STRING IT DOESN'T BECOME A CLASS JUST A NORMAL OBJECT
            const title = project._title;
            const icon = project._icon;
            
            const createdProject = createProject(title, icon);
            projectLinks.appendChild(createdProject);
        }
        setProjectIds();
        changeProjectCounter();
    }

    const resetProjectForm = () => {
        projectTitle.value = '';
        for (const icon of projectIconList) {
            icon.classList.remove('icon-selected');
        }

        projectIconList[0].classList.add('icon-selected');
    }

    const resetProjectIcons = () => {
        for (const icon of projectIconList) {
            icon.classList.remove('icon-selected');
        }
    }

    const changeProjectCounter = () => {
        projectCounter.textContent= `Projects (${projects.getProjectLength()})`;
    }

    const setProjectIds = () => {
        const projectList = document.querySelectorAll('.project-edit');

        for (let i = 0; i < projectList.length; ++i) {
            projectList[i].setAttribute('data-id', `${i}`);
            console.log('project', i, projectList[i]);
        }
    }

    const findSelectedLink = () => {
        for (let i = 0; i < projectLinks.childNodes.length; ++i) {
            if (projectLinks.childNodes[i].classList.contains('selected')) {
                return {project: projectLinks.childNodes[i], id:i};
            }
        }
    }

    const resetSelected = () => {
        for (let i = 0; i < projectLinks.childNodes.length; ++i) {
            projectLinks.childNodes[i].classList.remove('selected');
            
        }
    }

    const createTaskHeader = (headerIcon, headerTitle, button=false) => {
        const container = document.createElement('div');
        const mainHeader = document.createElement('header');
        const icon = new Image();
        const title = document.createElement('h1');
        const taskHeader = document.createElement('div');
        const taskCounter = document.createElement('p');
        const addTaskButton = new Image();
        const taskList = document.createElement('div');

        mainHeader.classList.add('main-header');
        icon.src = iconList[headerIcon];
        title.textContent = headerTitle;
        mainHeader.appendChild(icon);
        mainHeader.appendChild(title);

        taskHeader.classList.add('task-header');
        taskCounter.classList.add('task-counter');
        taskCounter.textContent = 'Tasks (1)';

        addTaskButton.src = AddIcon;
        addTaskButton.classList.add('task-add-button');
        taskHeader.appendChild(taskCounter);

        if (button) {
            taskHeader.appendChild(addTaskButton);
        }

        taskList.classList.add('task-list');

        container.appendChild(mainHeader);
        container.appendChild(taskHeader);
        container.appendChild(taskList);

        return container;

    }

    const populateTasks = (taskList) => {
        
    }


    return {
        createProject,
        addProject, 
        resetProjectForm, 
        resetProjectIcons,
        resetSelected,
        findSelectedIcon,
        findSelectedLink,
        changeProjectCounter, 
        setProjectIds,
        loadProjects,
        createTaskHeader
    }
})();


export default dom;
