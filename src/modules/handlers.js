import dom from './dom';

const handlers = (() => {
    const projectDialog = (() => {
        const dialogForm = document.querySelector('#project-dialog'); 
        const dialogCloseButton = document.querySelector('.close-dialog');
        const dialogShowButton = document.querySelector('#project-add-button');   
        const dialogSaveButton = document.querySelector('.project-submit > input');
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

    return {projectDialog, taskDialog, menuLinks, makeProjectHover}
})();

export default handlers;