const MongoClient = require('mongodb').MongoClient;
// importing application configuration file 
const userSampleData = require('./../model/userModel');

let mongodb = function mongodb() {    
   let database = null;
}

let databaseInstance = null;

mongodb.prototype.setup = function(callback) {
     const MongoClient = require('mongodb').MongoClient;
    let connectionString = 'mongodb://intellect:pcRugRY2T5@ds023448.mlab.com:23448/intellect'
    MongoClient.connect(connectionString,  function(err, db) {
        if(err) { 
            return callback(err);
        }else {
            databaseInstance = db;
            callback(null, db);
            // setupSampleData(db, function(err, result){
            //     callback(null, db);
            // });
            
        }
    });
}

mongodb.prototype.getUsers = function(callback){
    console.log("I am here");
   // var self = this; 
    var user = databaseInstance.collection('user');
  // Show that duplicate records got dropped
  user.find({}).toArray(function(err, items) {
   console.log("users are ", items);
   if(err) {
       callback(err, null);
   } else {
       callback(null, items);
   }
  });
}

function setupSampleData(db, callback) {
    db.collection("user").insertMany(userSampleData, function(err, res) {
        if (err){
            callback(err, null)
        }else {
            callback(null, 'done')
        }
  });
}
module.exports = mongodb;