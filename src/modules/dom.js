import FamilyIcon from '../assets/family-icon.svg';
import FoodIcon from '../assets/food-icon.svg';
import GiftIcon from '../assets/gift-icon.svg';
import ShoppingIcon from '../assets/shopping-icon.svg';
import SportsIcon from '../assets/sports-icon.svg';
import BookIcon from '../assets/book-icon.svg';
import EditIcon from '../assets/edit-icon.svg';
import DeleteIcon from '../assets/delete-icon.svg';

import projects from './projects';



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
        sports: SportsIcon
    }

    const createProject = () => {
        const title = projectTitle.value;
        const findSelectedIcon = () => {
            for (const projectIcons of projectIconList) {
                if (projectIcons.classList.contains('icon-selected')) {
                    return projectIcons.dataset.icon;
                } 
            }
            return 'book';
        }

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
        projecttitle.textContent = title;

        projectIcon.src = iconList[findSelectedIcon()];
        projectIcon.setAttribute('alt', 'project-icon');

        editIcon.src = EditIcon;
        editIcon.setAttribute('alt', 'edit icon');
        editIcon.classList.add('edit-project');

        deleteIcon.src = DeleteIcon;
        deleteIcon.setAttribute('alt', 'delete icon');
        deleteIcon.classList.add('delete-project');

        // ASSEMBLING PROJECT ELEMENTS
        projectContent.appendChild(projectIcon);
        projectContent.appendChild(projecttitle);

        projectEdit.appendChild(editIcon);
        projectEdit.appendChild(deleteIcon);

        link.appendChild(projectContent);
        link.appendChild(projectEdit);

        const project = projects.addProject(findSelectedIcon(), title);
        console.log(project);
        projectLinks.appendChild(link);
    }

    const resetProjectForm = () => {
        projectTitle.value = '';
        for (const icon of projectIconList) {
            icon.classList.remove('icon-selected');
        }
        projectIconList[0].classList.add('icon-selected');
    }

    const changeProjectCounter = (counter) => {
        projectCounter.value = `Projects (${counter})`;
    }

    return {createProject, resetProjectForm, changeProjectCounter}
})();


export default dom;