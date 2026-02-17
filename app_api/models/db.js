/**
 * db.js
 * ======
 *
 * Configures and manages the MongoDB connection using Mongoose.
 *
 * Responsibilities:
 * - Build the MongoDB connection string
 * - Establish initial database connection
 * - Monitor connection events
 * - Handle graceful shutdown signals
 * - Register Mongoose schemas
 *
 * This module is imported during application startup (app.js)
 */

const mongoose = require('mongoose'); 
const readLine = require('readline'); 

/***********************************************************
* Connection Configuration
************************************************************/

// Use environment variable if available, otherwise default to localhost
const host = process.env.DB_HOST || '127.0.0.1'; 
const dbURI = `mongodb://${host}/travlr`;
 
/**
 * Establishes connection to MongoDB.
 * A slight delay is used to ensure the environment is ready.
 */
const connect = () => { 
    setTimeout(() => mongoose.connect(dbURI, { 
    }), 1000); 
} 
 
/***********************************************************
* Connection Event Monitoring
************************************************************/
 
mongoose.connection.on('connected', () => { 
    console.log(`Mongoose connected to ${dbURI}`); 
}); 
 
mongoose.connection.on('error', err => { 
    console.log('Mongoose connection error: ', err); 
}); 
 
mongoose.connection.on('disconnected', () => { 
    console.log('Mongoose disconnected'); 
}); 
 
/***********************************************************
* Windows SIGINT Handling
************************************************************/ 

// Required for Windows environments where SIGINT behaves differently 
if(process.platform === 'win32'){ 
    const r1 = readLine.createInterface({ 
        input: process.stdin, 
        output: process.stdout 
    }); 
    r1.on('SIGINT', () => { 
        process.emit("SIGINT"); 
    }); 
} 

/***********************************************************
* Graceful Shutdown Handling
************************************************************/

/**
 * Closes the Mongoose connection and logs shutdown reason.
 *
 * @param {String} msg - Description of shutdown trigger
 */
const gracefulShutdown = (msg) => { 
    mongoose.connection.close(() => { 
        console.log(`Mongoose disconnected through ${msg}`); 
    }); 
}; 
 
// Restart via nodemon
process.once('SIGUSR2', () => { 
    gracefulShutdown('nodemon restart'); 
	process.kill(process.pid, 'SIGUSR2'); 
}); 

// Application termination (Ctrl+C)
process.on('SIGINT', () => { 
	gracefulShutdown('app termination'); 
	process.exit(0); 
});
 
// Container termination (e.g., Docker stop)
process.on('SIGTERM', () => { 
	gracefulShutdown('app shutdown'); 
	process.exit(0); 
}); 

/***********************************************************
* Initialize Connection & Load Schemas
************************************************************/
 
// Establish initial database connection
connect(); 

// Register Mongoose schemas
require('./travlr'); 

/***********************************************************
* Module Export
************************************************************/

// Exports the configured Mongoose instance.
// Importing this module ensures:
// - Database connection is initialized
// - Schemas are registered
module.exports = mongoose; 