const ref = firebase.firestore().collection('requests');

ref.onSnapshot(snapshot =>{
    let requsets = [];
    snapshot.forEach(doc => {
        requsets.push({...doc.data(),id:doc.id});
    });

    let html = '';

    requsets.forEach(requset =>{
        html += `<li>${ requset.text }</li>`;
    });

    document.querySelector('ul').innerHTML = html;
});