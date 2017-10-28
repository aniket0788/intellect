const MongoClient = require('mongodb').MongoClient;
// importing application configuration file 
const userSampleData = require('./../model/userModel');
const todoSampleData = require('./../model/todisModel');

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


mongodb.prototype.getTodo = function(todoId, callback){
    var todo = databaseInstance.collection('todos');
    console.log("todos ---", todoId);
    todo.findOne({'id': todoId},function(error, results){
        console.log(results); // output all records
        if (error) {
            console.log('error ', error);
            callback(error,null);
        } else {
             console.log('response ', results);
            callback(null, results)
        }
    });
} 

mongodb.prototype.getUsers = function(userId, callback){
    var user = databaseInstance.collection('user');
    console.log("userId ---", userId);
    user.findOne({'id': userId},function(error, results){
        console.log(results); // output all records
        if (error) {
            console.log('error ', error);
            callback(error,null);
        } else {
             console.log('response ', results);
            callback(null, results)
        }
    });
} 

mongodb.prototype.getToDoDetails = function(userId, callback){
    var user = databaseInstance.collection('todos');
    console.log("userId ---", userId);
    user.find({'userId': userId, 'done': false}).toArray(function(error, results){
        console.log(results); // output all records
        if (error) {
            console.log('error ', error);
            callback(error,null);
        } else {
             console.log('response ', results);
            callback(null, results)
        }
    });
} 



function setupSampleData(db, callback) {
    db.collection("user").insertMany(userSampleData, function(err, res) {
        if (err){
            callback(err, null)
        }else {
            db.collection("todos").insertMany(todoSampleData, function(err, res) {
                if (err){
                    callback(err, null)
                }else {
                    callback(null, 'done')
                }
            });
        }
  });
}
module.exports = mongodb;