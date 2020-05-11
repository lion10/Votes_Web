const authSwitchLinks = document.querySelectorAll('.switch');
const authModals = document.querySelectorAll('.auth .modal');
const authWrapper = document.querySelector('.auth');
const registerForm = document.querySelector('.register');
const loginForm = document.querySelector('.login');
const signOut = document.querySelector('.sign-out');



// toggle auth modal
authSwitchLinks.forEach(link =>{
    link.addEventListener('click',()=>{
        authModals.forEach(modal => modal.classList.toggle('active'));
    });
});

// register the user
registerForm.addEventListener('submit',(e) => {
   
    e.preventDefault(); // prevent refresh the form aften submit info

    // get user info 
    const email = registerForm.email.value;
    const password = registerForm.password.value;

    // signup the user 
    firebase.auth().createUserWithEmailAndPassword(email,password).then((user)=>{
        console.log('registered', user);
        registerForm.reset(); // close form field  
    })
    .catch(err =>{
        registerForm.querySelector('.error').innerHTML = err.message;
    });

});

// Sign Out
signOut.addEventListener('click',(e)=>{
    e.preventDefault();
    firebase.auth().signOut()
    .then(() => console.log('signed out!'));
});



// login the user
loginForm.addEventListener('submit',(e) => {
   
    e.preventDefault(); // prevent refresh the form aften submit info

    // get user info 
    const email = loginForm['email'].value;
    const password = loginForm['password'].value;

    // signup the user 
    firebase.auth().signInWithEmailAndPassword(email,password).then((user)=>{
        console.log('login', user);
        loginForm.reset(); // close form field  
    })
    .catch(err =>{
        loginForm.querySelector('.error').innerHTML = err.message;
    });
});



// auth listener
firebase.auth().onAuthStateChanged((user)=>{
    if(user){
        authWrapper.classList.remove('open');
        authModals.forEach(modal => modal.classList.remove('active'));
    }else{
        authWrapper.classList.add('open');
        authModals[0].classList.add('active');
    }
})