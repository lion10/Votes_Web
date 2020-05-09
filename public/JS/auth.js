const authSwitchLinks = document.querySelectorAll('.switch');
const authModals = document.querySelectorAll('.auth .modal');
const authWrapper = document.querySelector('.auth');


// toggle auth modal
authSwitchLinks.forEach(link =>{
    link.addEventListener('click',()=>{
        authModals.forEach(modal => modal.classList.toggle('active'));
    });
});