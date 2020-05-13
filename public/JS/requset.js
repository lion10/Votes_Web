var app = new Vue({
    el:'#app',
    data:{
        requests : [] 
    },
    methods:{
        upvoteRequest(id){
            const upvote = firebase.functions().httpsCallable('upvote');
            upvote({id})
                .catch(error =>{
                    showNotifiction(error.message);
                }); // upvote({id}) == upvote({id : id});
        },
    },
    mounted(){
        const ref = firebase.firestore().collection('requests').orderBy('upvotes','desc');
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