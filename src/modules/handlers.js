const dialog = (() => {
    const dialogForm = document.querySelector('#project-dialog'); 
    const dialogCloseButton = document.querySelector('.close-dialog');
    const dialogShowButton = document.querySelector('#show-dialog');   
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

export default {dialog, menuLinks};