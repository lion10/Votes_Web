const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
// func randomNumber

// // http request
// exports.randomNumber = functions.https.onRequest(((request,respose) => {
//     const number = Math.round(Math.random() * 100);
//     respose.send(number.toString());
// }));


// // http request
// exports.toTheFaceBookAccount = functions.https.onRequest(((request,respose) => {
//     respose.redirect('https://www.facebook.com/omar.abusabha.7');
// }));

// exports.sayHello = functions.https.onCall((data,context) =>{
//     const name = data.name; 
//     return `hello, ${name}`; 
// });


exports.newUserSignUp = functions.auth.user().onCreate( user => {
    // console.log('user created', user.email ,user.uid);

    //for background triggers this method must return a value/promise

    return admin.firestore().collection('user').doc(user.uid).set({
        email: user.email,
        upvotedOn :[]
    })
});

exports.userDeleted = functions.auth.user().onDelete( user => {
    //console.log('user deleted', user.email, user.uid);
    
    //for background triggers this method must return a value/promise
    const doc = admin.firestore().collection('user').doc(user.uid);
    return doc.delete();
});
