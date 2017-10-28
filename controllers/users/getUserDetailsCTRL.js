// const db = require('./../../db/dbSetup');
// importing application configuration file 
const config = require('./../../config');
module.exports = function (req, res, next) {
    let json_response = {'name': 'alok'}
    config.mongodbInstance.getUsers(function(err, items){
        if(err) {
            res.status(500).json(err);
            return next();
        }
        res.status(200).json(items);
        return next();
    });   
}