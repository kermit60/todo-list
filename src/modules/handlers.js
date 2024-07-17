import dom from './dom';
import projects from './projects';

const handlers = (() => {
    const formTitle = document.querySelector('#project-dialog .form-title');
    const dialogSaveButton = document.querySelector('.project-submit > input');


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
            dom.addProject();
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
            
            deleteButton.addEventListener('click', () => {
                const projectDelete = e.target.parentElement;
                console.log('Deleting', projectDelete);
                projects.removeProject(projectDelete.dataset.id);
                console.log(projects.getProjects())
                dialogForm.close();
                dom.loadProjects(projects.getProjects());
            });
        })
    };

    const makeEdit = (project) => {
        const projectDialog = document.querySelector('#project-dialog');
        const taskDialog = document.querySelector('#task-dialog');
        const formTitle = document.querySelector('#project-dialog .form-title');
        const editIconButton = document.querySelector('#project-form > .project-submit > input')
        const projectIcons = document.querySelectorAll('.project-icon');

        const element = project.dataset.element;
        if (element === 'project') {
            project.addEventListener('click', (e) => {
                const projectId = e.target.parentElement.dataset.id;
                const projectInput = document.querySelector('#project-title-value');
                const projectTitle = e.target.parentElement.previousElementSibling.lastChild.textContent;
                const projectIcon = projects.getProjects()[projectId].getIcon;

                console.log(e.target.parentElement)
                console.log(title);
                console.log(projectIcon);

                // presetting the form values to match the project values
                projectInput.value = projectTitle;
                dom.resetProjectIcons();
                for (const project of projectIcons) {
                    if (project.dataset.icon === projectIcon) {
                        project.classList.add('icon-selected');
                    }
                }
                
                
                formTitle.textContent = 'Edit project';
                editIconButton.setAttribute('value', 'Edit');
                projectDialog.showModal();

                // also get the correct icon selected

                editIconButton.addEventListener('click', () => {
                    const projectEdit = projectInput.value;

                })

            });

            

        } else {
            project.addEventListener('click', () => {
                taskDialog.showModal();
            });
        }

        
    }

    return {makeProjectHover, makeDelete, makeEdit};
})();

export default handlers;