// Install express using require
const express = require('express');
// import the fake store controller and assign to a variable 
const fakeStoreController = require('../controllers/fakeStoreController');
// create the router using the express.Router() method
const router = express.Router();

// create the route to the fake store API 
router.get("/", (req, res) => {
    fakeStoreController.fetchProducts(req, res)
});

// export the router 
module.exports = router;