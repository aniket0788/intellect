// import express module

const express = require('express');
const router = express.Router();

// import user details controller
const getTodoDetails = require('./../controllers/todos/getTodoDetailsCTRL');
router.get('/details', function(req, res) {
    getTodoDetails(req, res);
});

module.exports = router;