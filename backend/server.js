require('dotenv').config(); // Load environment variables from .env file

// ##### Dependencies ##### //
const express = require('express'); // Express web server framework
const cors = require('cors'); // Enable Cross-Origin Resource Sharing
const mysql = require('mysql/promise'); // MySQL client
const cookieParser = require('cookie-parser'); // Parse cookies in request headers

// ####################### //


// ####### Create a new Express application ####### //
const app = express();
const port = process.env.PORT || 3000;
// ####################### //



// ####### Middleware ####### //
app.use(cors());
app.use(express.json());
app.use(cookieParser());
// ####################### //


// ####### MySQL Connection Pool ####### //
const databaseConfig = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Create a MySQL connection pool to handle multiple connections if needed
const databasePool = mysql.createPool(databaseConfig); // Create a MySQL connection pool
if (databasePool) {
    console.log('Connected to MySQL database'); // Log successful connection
} else { 
    console.error('Error connecting to MySQL database'); // Log connection error
}
// ####################### //


// ####### Routes ####### //
const formRoutes = require('./routes/formRoutes')(databasePool); // Import form routes and pass the database pool

// Use routes
app.use('/v1/api/form', formRoutes); // Use the form routes for the '/v1/api/form' endpoint

// ####################### //

// ####### Start the server ####### //
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

console.log('Server started');
// ####################### //


