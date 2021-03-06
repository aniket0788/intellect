// import express module

const express = require('express');
const router = express.Router();

// import user details controller
const getUserDetails = require('./../controllers/users/getUserDetailsCTRL');
router.get('/details', function(req, res) {
    getUserDetails(req, res);
});

module.exports = router;