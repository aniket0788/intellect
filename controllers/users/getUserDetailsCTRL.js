// importing application configuration file 
const config = require('./../../config');
 var url = require('url')
 // importing async module
var async = require('async');
module.exports = function (req, res) {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    let userId = query.userid;
    console.log("userid - ",userId);
    if(userId == null || userId == undefined || userId > 0) {
        async.waterfall([
            function (callback) {
                // Seting up connection to mongod
            getUserDetails(userId, function(err, userDetails){
                if(err){
                    callback(err);
                } else {
                    callback(null, userDetails);
                }
            })
            },
            function (userDetails, callback) {
                getToDoDetails(userId, function(err, todos){
                    if(err){
                        callback(err);
                    } else {
                        userDetails.todos = todos
                        callback(null, userDetails);
                    }
                })
            }
        ], function (err, result) {
            if(err){
                return res.status(500).json({'error': 'internal server error'})
            } else {
                res.status(200).json(result);
            }
        });
     
    } else {
        res.status(400).json({'error': 'invalid userid'});
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