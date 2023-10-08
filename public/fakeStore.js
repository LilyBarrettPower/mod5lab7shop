// Creating the selection dropdown:
function populateCategoryDrop(data) { // Function to populate the category selection dropdown with unique dropdowns 
    const categorySelect = document.getElementById('categorySelect');
    const categories = new Set(); //Using a Set to store the unique actegories 

    data.forEach((item) => {
        categories.add(item.category); //iterate over the array, extract the category of each item and add to the categories set (only unique categories)
    });
    categories.forEach((category) => {
        const option = document.createElement('option'); // add each category as an option in the dropdown
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option); // append the new unique categories into the selection dropdown box 
    });
}
// Adding icons to each item in a category using switch statement:
function getIconClassCategory(category) {
    switch (category.toLowerCase()) {
        case "electronics":
            return "fa-solid fa-laptop";
        case "men's clothing":
            return "fa-solid fa-shirt";
        case "women's clothing":
            return "fa-solid fa-person-dress";
        case "jewelery":
            return "fa-solid fa-ring";
        default:
            return "fa-solid fa-shop";
    }
}

document.addEventListener('DOMContentLoaded', function () { // ensures the js code is runs after the DOM is fully loaded 
    // fetch the fake store API from the back end of the server 
    fetch('/fakeStoreAPI')
        .then((response) => { // promise
            if (!response.ok) {
                throw new Error('fetch unsuccessful'); // throw an error if unsuccessful
            }
            return response.json(); // if successesful, return the json data
        })
        .then((data) => { // promise
            const cardContainer = document.getElementById("card-container"); // store DOM element card-container in cardContainer
            const cardTemplate = document.getElementById('cardTemplate');

            console.log(data)
            populateCategoryDrop(data); // call the populateCategoryDrop function 

            function filterProductCategories(category, searchKeyword) { // filter products based on the selection dropdown category AND the searchKeyword
                cardContainer.innerHTML = ""; // clear any existing cards 

                data.forEach((item) => { // iterate through json data
                    if ((!category || item.category === category) && (!searchKeyword || item.title.toLowerCase().includes(searchKeyword.toLowerCase()))) {
                        // If no category is selected, OR if the product category matches the selected category, this condition is met 
                        // If no search keyword is inputted, OR if the product containes the keyword (case insenstive)
                        const cardClone = cardTemplate.content.cloneNode(true); // clone the template for each json item
                        const title = cardClone.querySelector(".card-title").textContent = item.title; // put the json file title as teh title of the card
                        const text = cardClone.querySelector(".card-text").textContent = item.description; //put the json file description as the card text
                        const price = cardClone.querySelector(".card-price").textContent = `$${item.price}`; // put the json price as the card-price 
                        const image = cardClone.querySelector(".card-image").src = item.image; // put the json image as the card-image
                        // images are appended to the card-image html element  
                        const iconElement = cardClone.querySelector(".card-icon i");
                        iconElement.className = getIconClassCategory(item.category); // call the getIconClassCategory function 

                        cardContainer.appendChild(cardClone) // add a new card for each json item
                    }
                });
            }
            const categorySelect = document.getElementById('categorySelect');
            const searchInput = document.getElementById('searchInput');

            categorySelect.addEventListener("change", function () { // create an event listener for the selection drop down box 
                const selectedCategory = categorySelect.value;
                const searchKeyword = searchInput.value; // output is updated based on the category selected and any keywords selected 
                filterProductCategories(selectedCategory, searchKeyword); // filterProductCategories is called on event listener
                // products that match the selection dropdown and search keywowrd will be displayed 
            });

            searchInput.addEventListener("input", function () { // create an event listener for the search bar 
                const selectedCategory = categorySelect.value;
                const searchKeyword = searchInput.value;
                filterProductCategories(selectedCategory, searchKeyword); // event listener will get the selected category and search keyword 
                // will display these products when the search is entered 
            });

            filterProductCategories(null); // To insure all products are displayed before a selection is made 
        })
        .catch((error) => {
            console.error(error); // error handling 
        });
});