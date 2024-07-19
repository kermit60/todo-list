import dom from './dom';
import projects from './projects';

const handlers = (() => {
    const formTitle = document.querySelector('#project-dialog .form-title');
    const dialogSaveButton = document.querySelector('.project-submit > input');
    const projectsTitle = document.querySelector('#delete-form > .project-deletion-text > b');
    const projectLinks = document.querySelector('.project-links');

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

    const taskDialog = (() => {
        const dialogForm = document.querySelector('#task-dialog'); 
        const dialogCloseButton = document.querySelector('.task-close-dialog');
        const dialogShowButton = document.querySelector('.task-add-button'); 

        dialogCloseButton.addEventListener('click', (e) => {
            e.preventDefault();
            dialogForm.close();
        })

        dialogShowButton.addEventListener('click', () => {
            dialogForm.showModal();
        })
    })();

    const menuLinks = (() => {
        const sidebarLinks = document.querySelectorAll('.link');

        for (let link of sidebarLinks) {
            link.addEventListener('click', () => {
                reset();
                link.classList.add('selected');
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
        project.addEventListener('click', () => {
            menuLinks.reset();
            project.classList.add('selected');
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
                console.log(projectLinks.childNodes[i])
                if (projectLinks.childNodes[i].classList.contains('selected')) {
                    projects.removeProject(projectLinks.childNodes[i].dataset.id);
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
                const projectIcon = projects.getProjects()[projectId].getIcon;

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
                console.log('whats the projectlink', projectLink);
                console.log('Whats the type of projectlink', typeof projectLink);
                if (projectLink) {
                    const newProjectLink = dom.createProject(newProjectTitle, newProjectIcon);
                    newProjectLink.classList.add('icon-selected')
                    console.log(newProjectTitle, newProjectIcon, newProjectId, projectLink, newProjectLink);
                    projects.editProject(newProjectId, newProjectTitle, newProjectIcon);
                    projectLinks.replaceChild(newProjectLink, projectProject);
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

    return {makeProjectHover, makeDelete, makeEdit};
})();

export default handlers;