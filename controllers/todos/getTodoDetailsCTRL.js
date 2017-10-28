// importing application configuration file 
const config = require('./../../config');
 var url = require('url')
 // importing async module
var async = require('async');
module.exports = function (req, res) {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    let todoId = query.todoId;
    if(todoId == null || todoId == undefined || todoId > 0) {
         config.mongodbInstance.getTodo(todoId, function(err, todo) {
            if(err) {
                return res.status(500).json({'error': 'internal server error'})
            } else {
                console.log(todo);
                if(todo == null) {
                     res.status(200).json({'success': 'no todo list present'});
                } else {
                     res.status(200).json(todo);
                }            
            }
        });      
    } else {
        res.status(400).json({'error': 'invalid todoId'});
    }
}


function getUserDetails(userId, callback){
    config.mongodbInstance.getUsers(userId, function(err, user) {
        if(err) {
            callback(err, null);
        } else {
            console.log(user);
            callback(null,user)
        }
    }); 
}

function getToDoDetails(userId, callback){
    config.mongodbInstance.getToDoDetails(userId, function(err, user) {
        if(err) {
            callback(err, null);
        } else {
            console.log(user);
            callback(null,user)
        }
    }); 
}