require('dotenv').config(); // Load environment variables from .env file

// ##### Dependencies ##### //
const express = require('express'); // Express web server framework
const cors = require('cors'); // Enable Cross-Origin Resource Sharing
const mysql = require('mysql2/promise'); // MySQL client
const cookieParser = require('cookie-parser'); // Parse cookies in request headers

// ####################### //


// ####### Create a new Express application ####### //
const app = express();
const port = process.env.PORT || 3002; // Set the port to the environment variable or 3002
// ####################### //



// ####### Middleware ####### //
app.use(cors());
app.use(express.json());
app.use(cookieParser());
// ####################### //

// ####### MySQL Connection Pool ####### //
const databasePool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Ensure the connection pool is properly created
databasePool.getConnection()
  .then(() => {
    console.log('Database connected successfully!');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
    process.exit(1); // Exit the process if there's an error connecting to the database
  });
// ####################### //


// ####### Routes ####### //
const formRoutes = require('./routes/formRoutes')(databasePool); // Import form routes and pass the database pool
const eventsRoutes = require('./routes/eventsRoutes')(databasePool); // Import events routes and pass the database pool
// Use routes
app.use('/v1/api/form', formRoutes); // Use the form routes for the '/v1/api/form' endpoint
app.use('/v1/api/events', eventsRoutes); // Use the events routes for the '/v1/api/events' endpoint
// ####################### //

// ####### Start the server ####### //
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

console.log('Server started');
// ####################### //


