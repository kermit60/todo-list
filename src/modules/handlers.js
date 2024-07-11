const projectDialog = (() => {
    const dialogForm = document.querySelector('#project-dialog'); 
    const dialogCloseButton = document.querySelector('.close-dialog');
    const dialogShowButton = document.querySelector('#project-add-button');   
    
   
    dialogCloseButton.addEventListener('click', (e) => {
        e.preventDefault();
        dialogForm.close();
    })
    
    dialogShowButton.addEventListener('click', () => {
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
        for (let link of sidebarLinks) {
            link.classList.remove('selected');
        }
    }

})();

export default {projectDialog, menuLinks, taskDialog};