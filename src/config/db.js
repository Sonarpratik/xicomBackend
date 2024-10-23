const mongoose = require('mongoose');

// Function to connect to the database
const connectDB = async () => {
    try {
        // Connect to the MongoDB database
        await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        // Exit the process with failure
        process.exit(1);
    }
};

// Export the connectDB function
module.exports = connectDB;
