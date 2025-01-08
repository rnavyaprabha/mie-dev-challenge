// config.js
// Configuration for application

const config = {
    // Application port
    port: process.env.PORT || 3000,

    // Database connection parameters
    db: {
        host: process.env.DB_HOST || 'db', // Use 'db' as the default host
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'wonderful',
        database: process.env.DB_NAME || 'miechallenge',
    }
};

module.exports = config;
