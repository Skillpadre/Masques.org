const mongoose = require('mongoose');
const username = ''
const password = ''

// --------------------- BDD -----------------------------------------------------
// useNewUrlParser ;)
var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology: true
   };

mongoose.connect('mongodb+srv://' + username + ':' + password + '@cluster0-4gyky.mongodb.net/masquesOrg?retryWrites=true&w=majority',
   options,
   function(err) {
    if (err) {
      console.log(`error, failed to connect to the database because --> ${err}`);
    } else {
      console.info('*** Database Masques.org connection : Success ***');
    }
   }
);