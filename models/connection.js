const mongoose = require('mongoose');

// --------------------- BDD -----------------------------------------------------
// useNewUrlParser ;)
var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology: true
   };

mongoose.connect('mongodb+srv://masquesOrgAdmin:TPM5VxvksdKqNzIj@cluster0-4gyky.mongodb.net/test?retryWrites=true&w=majority',
   options,
   function(err) {
    if (err) {
      console.log(`error, failed to connect to the database because --> ${err}`);
    } else {
      console.info('*** Database Masques.org connection : Success ***');
    }
   }
);