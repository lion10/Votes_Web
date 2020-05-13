const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
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


// http callable function ( adding a requset )
// http callable function (adding a request)
exports.addRequest = functions.https.onCall((data, context) => {
   // console.log('add request')

    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated', 
        'only authenticated users can add requests'
      );
    }
    if (data.text.length > 30) {
      throw new functions.https.HttpsError(
        'invalid-argument', 
        'request must be no more than 30 characters long'
      );
    }

    if (context.auth && data.text.length < 30 ) {
        return admin.firestore().collection('requests').add({
            text: data.text,
            upvotes: 0
        });
    }

    return 'error';

});


// upvote callable function

exports.upvote =functions.https.onCall( async (data, context) => {
    //data => requset collection , context(auth) => user collection

    // check auth state
    if(!context.auth){
      throw new functions.https.HttpsError(
        'unauthenticated', 
        'only authenticated users can add requests'
      );
    }

    const request = admin.firestore().collection('requests').doc(data.id);
    const user = admin.firestore().collection('user').doc(context.auth.uid);
    
    const doc = await user.get();
      
      if(doc.data().upvotedOn.includes(data.id)){
        throw new functions.https.HttpsError(
          'failed-precondition',
          'You can only upvote something once'
        );
      }
      // update user collection array
      // eslint-disable-next-line promise/no-nesting
      await user.update({
        upvotedOn : [...doc.data().upvotedOn, data.id]
      })

      // update votes on the requset
      return request.update({
        upvotes: admin.firestore.FieldValue.increment(1)
      });

    

}); 
 
