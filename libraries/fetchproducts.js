// create a javascript class called FakeStoreLibrary
class FakeStoreLibrary {
    // initialise an instance variable with an empty string. This will be where the data fetched from the external API will be stored 
    constructor() {
        this.products = ""
    }
    // create a method fetchProducts within the class 
    async fetchProducts() {
        try {
            this.products = await this.retrieveProducts();
            return this.products;
        } catch (error) {
            throw error;
        }
    }
    // create an async method retrieveProducts 
    async retrieveProducts() {
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            if (!response.ok) { // if the response is not ok, there will be an erro
                throw new Error('fetch unsuccessful');
            }
            return await response.json();
        } catch (error) {
            throw error;
        }
    }
}

// export the fakestorelibrary 
module.exports = FakeStoreLibrary;