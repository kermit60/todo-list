import dom from './dom';
import projects from './projects';
import tasks from './tasks';

const handlers = (() => {
    const formTitle = document.querySelector('#project-dialog .form-title');
    const dialogSaveButton = document.querySelector('.project-submit > input');
    const projectsTitle = document.querySelector('#delete-form > .project-deletion-text > b');
    const projectLinks = document.querySelector('.project-links');
    const mainContent = document.getElementById('main');
    const taskList = document.querySelector('#main > #task-list');

    const projectDialog = (() => {
        const dialogForm = document.querySelector('#project-dialog'); 
        const dialogCloseButton = document.querySelector('.close-dialog');
        const dialogShowButton = document.querySelector('#project-add-button');   
        const dialogTitle = document.querySelector('#project-dialog .form-title');
        const icons = document.querySelectorAll('.project-icon');

        for (const icon of icons) {
            icon.addEventListener('click', () => {
                for (const icon of icons) {
                    icon.classList.remove('icon-selected');
                }
                icon.classList.add('icon-selected');
            });
        }

        dialogSaveButton.addEventListener('click', () => {
            const submitInput = document.querySelector('#project-form > .project-submit > input');
            if (submitInput.value === 'Add') {
                dom.resetSelected();
                dom.addProject();
            }
            
        })

        dialogCloseButton.addEventListener('click', (e) => {
            e.preventDefault();
            dom.resetProjectForm();
            dialogForm.close();
        })
        
        dialogShowButton.addEventListener('click', () => {
            dialogTitle.textContent = 'Add project';
            dialogSaveButton.value = 'Add'
            dom.resetProjectForm();
            dialogForm.showModal();
        })

    })();



    const menuLinks = (() => {
        const sidebarLinks = document.querySelectorAll('.link');

        for (let link of sidebarLinks) {
            // console.log('SIDEBAR LINKS', link);
            link.addEventListener('click', () => {
                reset();
                link.classList.add('selected');
                const linkIcon = link.dataset.icon;
                const linkTitle = linkIcon[0].toUpperCase() + linkIcon.substring(1);
                taskList.textContent = '';
                dom.changeTaskHeader(linkIcon, linkTitle);
                dom.loadTasks(tasks.getMenuTasks(linkIcon), taskList);
                dom.changeTaskCounter(tasks.getMenuTasksLength(linkIcon));
            });

            link.addEventListener('mouseover', () => {
                link.classList.add('selected-hover');
            })

            link.addEventListener('mouseout', () => {
                link.classList.remove('selected-hover');
            })
        }

        const reset = () => {
            const links = document.querySelectorAll('.link');
            for (let link of links) {
                link.classList.remove('selected');
            }
        }
        return {reset};
    })();
   
    const makeProjectHover = (project) => {
        project.addEventListener('click', (e) => {
            
            menuLinks.reset();
            project.classList.add('selected');
            // need to add the project IDS with the headers and stuff ids

            const projectId = project.childNodes[1].dataset.id;
            const p = projects.getProject(projectId);
            console.log(p);
            dom.changeTaskHeader(p._icon, p._title, true, projectId);
            // LOADING THE TASKS
            
            console.log('TASKLIST SSSS', taskList);
            taskList.textContent = '';
            dom.loadTasks(tasks.getProjectTasks(projectId), taskList);
            // change the tasks counter
            dom.changeTaskCounter(tasks.getProjectTasksLength(projectId));

        });

        project.addEventListener('mouseover', () => {
            project.classList.add('selected-hover');
        })

        project.addEventListener('mouseout', () => {
            project.classList.remove('selected-hover');
        })
    }

    // When you create something new handlers are created with it
    const makeDelete = (project, name='') => {
        const dialogForm = document.querySelector('#delete-dialog');
        const element = project.dataset.element;
        const title = document.querySelector('#delete-dialog .form-title');
        const taskName = document.querySelector('.task-deletion-text > b');
        const projectName = document.querySelector('.project-deletion-text > b');
        const taskDelete = document.querySelector('.task-deletion-text');
        const projectDelete = document.querySelector('.project-deletion-text');
        const deleteButton = document.querySelector('#delete-form > .project-submit > input');
        
        project.addEventListener('click', (e) => {
            console.log(e.target.parentElement.dataset.id);
            
            // Alter title if project or task
            if (element === 'project') {
                taskDelete.classList.add('hide');
                projectDelete.classList.remove('hide');
                projectName.textContent = name;
                title.textContent = 'Delete Project';
    
            } else {
                projectDelete.classList.add('hide');
                taskDelete.classList.remove('hide');
                taskName.textContent = name;
                title.textContent = 'Delete Task';
            }
            dialogForm.showModal();

        })

        deleteButton.addEventListener('click', () => {
            // using the .selected as a indicator of what's the id we can remove it from the DOM
            for (let i = 0; i < projectLinks.childNodes.length; ++i) {
                console.log('WTF IS THIS', projectLinks.childNodes[i]);
                if (projectLinks.childNodes[i].classList.contains('selected')) {
                    console.log(projects.getProjects());
                    console.log('DELETING LINK', projectLinks.childNodes[i].childNodes[1].dataset.id)
                    projects.removeProject(projectLinks.childNodes[i].childNodes[1].dataset.id);
                    projectLinks.removeChild(projectLinks.childNodes[i]);
                    break;
                }
            }
            
            dom.setProjectIds();
            dom.changeProjectCounter();
            dialogForm.close();
            
        });
    };

    const makeEdit = (project) => {
        const projectDialog = document.querySelector('#project-dialog');
        const taskDialog = document.querySelector('#task-dialog');
        const formTitle = document.querySelector('#project-dialog .form-title');
        const editIconButton = document.querySelector('#project-form > .project-submit > input')
        const projectIcons = document.querySelectorAll('.project-icon');
        const projectInput = document.querySelector('#project-title-value');

        const element = project.dataset.element;
        if (element === 'project') {
            project.addEventListener('click', (e) => {
                const projectId = e.target.parentElement.dataset.id;
                
                const projectTitle = e.target.parentElement.previousElementSibling.lastChild.textContent;
                // THERE'S A WEIRD INTERACTION WITH _ICON AND ICON
                const projectIcon = projects.getProject(projectId).getIcon;

                console.log(e.target.parentElement)
                console.log(title);
                console.log(projectIcon);

                // presetting the form values to match the project values
                projectInput.value = projectTitle;
                dom.resetProjectIcons();
                for (const p of projectIcons) {
                    if (p.dataset.icon === projectIcon) {
                        p.classList.add('icon-selected');
                    }
                }
                
                
                formTitle.textContent = 'Edit project';
                editIconButton.value = 'Edit';
                projectDialog.showModal();

                
            });

            // FIX FEATURE ON HOW TO EDIT THE PROJECTS
            editIconButton.addEventListener('click', () => {
                const newProjectTitle = projectInput.value ? projectInput.value : '';
                const projectLink = dom.findSelectedLink();
                const newProjectIcon = dom.findSelectedIcon();
                const projectProject = projectLink ? projectLink.project : '';
                const newProjectId = projectLink ? projectLink.id : -1;
                // console.log('whats the projectlink', projectLink);
                // console.log('Whats the type of projectlink', typeof projectLink);
                if (projectLink) {
                    const newProjectLink = dom.createProject(newProjectTitle, newProjectIcon);
                    newProjectLink.classList.add('icon-selected')
                    // console.log(newProjectTitle, newProjectIcon, newProjectId, projectLink, newProjectLink);
                    projects.editProject(newProjectId, newProjectTitle, newProjectIcon);
                    projectLinks.replaceChild(newProjectLink, projectProject);
                    
                    // NEED TO CHANGE TASKHEADER
                    
                    dom.changeTaskHeader(newProjectIcon, newProjectTitle, true, newProjectId);
                    dom.setProjectIds();
                }

                projectDialog.close();
            })

        } else {
            project.addEventListener('click', () => {
                taskDialog.showModal();
            });


        }

        
    }


    const addTaskDialog = (() => {
        const dialogForm = document.querySelector('#task-dialog'); 
        const dialogCloseButton = document.querySelector('.task-close-dialog');
        const dialogAddButton = document.querySelector('#task-form > .task-submit > input');
        const button = document.querySelector('.task-add-button');

        // GETTING ALL THE VALUES NEEDED FOR THE FORM
        const titleInput = document.querySelector('#task-form  #title');
        const descriptionInput = document.querySelector('#task-form #description');
        const dueDateInput = document.querySelector('#task-form #dueDate');
        const priorityInput = document.querySelector('#task-form #priority');
        

        dialogAddButton.addEventListener('click', (e) => {
            console.log(e.target);
            const projectId = document.querySelector('#main > #task-list');
            const taskLink = document.querySelector('#main > #task-list');
            // task.addTask();
            const title = titleInput.value;
            const description = descriptionInput.value;
            const dueDate = dueDateInput.value;
            const priority = priorityInput.value;
            const id = projectId.dataset.id;
            console.log(titleInput.value);
            console.log(descriptionInput.value);
            console.log(dueDateInput.value);
            console.log(priorityInput.value);
            tasks.addProjectTask(title, description, dueDate, priority, id);
            taskLink.appendChild(dom.createTaskItem({title, description, dueDate, priority}));
        })

        dialogCloseButton.addEventListener('click', (e) => {
            e.preventDefault();
            dialogForm.close();
        })

        button.addEventListener('click', () => {
            dialogForm.showModal();
        })
    })();



    return {
        makeProjectHover, 
        makeDelete,
        makeEdit,
        addTaskDialog
    };
})();

export default handlers;