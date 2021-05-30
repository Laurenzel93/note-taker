const express = require("express");
const apiRoute = require('./routes/routes');

// Initialize the app and create a port
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/', apiRoute);

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));