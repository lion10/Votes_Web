const functions = require('firebase-functions');

// func randomNumber

// http request
exports.randomNumber = functions.https.onRequest(((request,respose) => {
    const number = Math.round(Math.random() * 100);
    respose.send(number.toString());
}));


// http request
exports.toTheFaceBookAccount = functions.https.onRequest(((request,respose) => {
    respose.redirect('https://www.facebook.com/omar.abusabha.7');
}));

exports.sayHello = functions.https.onCall((data,context) =>{
    const name = data.name; 
    return `hello, ${name}`; 

});
