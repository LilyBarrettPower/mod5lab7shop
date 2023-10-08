// create a javascript class called FakeStoreLibrary
class FakeStoreLibrary {
    // initialise an instance variable with an empty string. This will be where the data fetched from the external API will be stored 
    constructor() {
        this.products = ""
    }
    // create a method fetchProducts within the class 
    // fetchProducts() {
    //     // declare the variable data 
    //     let data
    //     // assign the result of calling the retrieveProducts() method
    //     data = this.retrieveProducts()
    //     // return this.products variable
    //     return this.products
    // }
    // create an async method retrieveProducts 
    async retrieveProducts() {
        // use fetch to make an HTTP GET request to the fakestoreAPI
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) { // if the response is not ok, there will be an erro
            throw new Error('fetch unsuccessful');
        }
        return await response.json();
    }
}
// export the fakestorelibrary 
module.exports = FakeStoreLibrary;