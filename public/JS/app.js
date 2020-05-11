const requestModal = document.querySelector('.new-request');
const requestLink = document.querySelector('.add-request');
const requsetForm = document.querySelector('.new-request form')


// open request modal
requestLink.addEventListener('click', () => {
  requestModal.classList.add('open');
});

// close request modal
requestModal.addEventListener('click', (e) => {
    // to prevent closed when i click on the popup , 
    //just closed after the user clicked on the target of the event
  if (e.target.classList.contains('new-request')) {
    requestModal.classList.remove('open');
  }
});

// const button = document.querySelector('.call');
// button.addEventListener('click',()=>{
  
//   const sayHello = firebase.functions().httpsCallable('sayHello');
//   sayHello({name : 'Omar'}).then(result =>{
//     console.log(result.data);
//   });

// })


// add a new requset

requsetForm.addEventListener('submit', (e) =>{
  e.preventDefault();

  const addRequset = firebase.functions().httpsCallable('addRequest');
  
  addRequset({
    text : requsetForm.request.value,
  }).then(() =>{

    requsetForm.reset();
    requestModal.classList.remove('open');
    requsetForm.querySelector('.error').textContent = '';

  }).catch(error =>{

    requsetForm.querySelector('.error').textContent = error.message;

  })

});



 