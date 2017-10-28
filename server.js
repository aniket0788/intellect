
// import express module
const express = require('express');
// create an instance of express module 
const app = express();
// importing application configuration file 
const config = require('./config');

// importing mongodb setup  
const mongodSetup = require('./db/dbSetup');

// importing application configuration file 
const userRouter = require('./routers/userRouter');
const todoRouter = require('./routers/todoRouter');


// get an instance of router
const router = express.Router();

// importing async module
var async = require('async');

// running a waterfall model on various steps to start the server, if any one of the step return error then server will get kill
async.waterfall([
    function (callback) {
        // Seting up connection to mongod
        let mongoInstance = new mongodSetup();
        mongoInstance.setup(function(err, db){
            if (err){
                callback(err);
            } else {
                console.log("Connection to mongodb is successfull ");
                callback(null, mongoInstance);
            }
        });
    },
    function (mongoInstance, callback) {
        config.mongodbInstance = mongoInstance;
        // apply the routes to our application
        app.use('/user', userRouter);
        app.use('/todo', todoRouter);
        callback(null);
    },
    function (callback) {
        //Binds and listens for connections on the specific  port.
        app.listen(config.port, function () {
            console.log('Graphql Server is running on port ',  this.address().port);
            callback(null)
        });
    }
], function (err, result) {
    if(err){
        console.log("Error during starting server");
    } else {
        console.log('Server started successfully  ');
    }
});
