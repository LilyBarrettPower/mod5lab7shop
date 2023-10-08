// import the fetchproducts library using require 
const FakeStoreLibrary = require('../libraries/fetchproducts');

// create a new instance of the library - you can access method f the library through the fakestore variable 
let fakeStore = new FakeStoreLibrary();

const fetchProducts = (req, res) => {
    // call the retrieveProducts method of the fakeStore instance. returns a promise 
    let result = fakeStore.retrieveProducts()
        .then((data) => {
            // the .then statement handles the promise and returns a call back function
            res.status(200); // everything is OK
            console.log(data) // log the data to the console for debugging purposes 
            res.json(data) // return the data in json format 
        })
}
// export the fetchProducts function
module.exports = {fetchProducts}