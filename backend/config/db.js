// Importing mongoose, a library that provides a straightforward way to work with MongoDB
const mongoose = require('mongoose');

// Function to connect to the MongoDB database
const connectDB = async () => {
    try {
        // Attempting to establish a connection to the database using the URI from environment variables
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true, // Ensuring the use of the new URL parser
            useUnifiedTopology: true, // Enabling the new unified topology engine
        });
        // Logging a success message including the host of the connected database
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        // Logging an error message if there was a problem connecting to the database
        console.error(`Error: ${error.message}`);
        // Exiting the process with an error code
        process.exit(1);
    }
};

// Exporting the connectDB function to use it in other files
module.exports = connectDB;
