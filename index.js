
// include express using require
const express = require('express');

//include the fake store route using require
const fakeStoreRoutes = require('./routes/fakeStoreRoute');
// create the server application using express
// include swagger 
const swaggerUi = require('swagger-ui-express');
// incluse swagger documentation
swaggerDocument = require('./swagger.json');


const serverApp = express();
// choose the port for the server to run on
const port = 3004;

// map the route for swagger documentation
serverApp.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// map the route you want the API to have 
serverApp.use('/fakeStoreAPI', fakeStoreRoutes);
// serve the index.html page as the static page to act as the UI 
serverApp.use('/', express.static("public"));

// Start the server as log a message to the console 
serverApp.listen(port, () => console.log(`Server running on http://localhost:${port}`));
