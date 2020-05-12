var app = new Vue({
    el:'#app',
    data:{
        requests : [] 
    },
    mounted(){
        const ref = firebase.firestore().collection('requests');
        ref.onSnapshot(snapshot =>{
                let requests = [];
                snapshot.forEach(doc => {
                    requests.push({...doc.data(),id:doc.id});
            });
            this.requests = requests; 
        });
    }
});




// const ref = firebase.firestore().collection('requests');

// ref.onSnapshot(snapshot =>{
//     let requsets = [];
//     snapshot.forEach(doc => {
//         requsets.push({...doc.data(),id:doc.id});
//     });

//     let html = '';

//     requsets.forEach(requset =>{
//         html += `<li>${ requset.text }</li>`;
//     });

//     document.querySelector('ul').innerHTML = html;
// });