//require in pg (located in modules folder)
const pg = require('pg');

//get the Pool object from pg
const Pool = pg.Pool;
//Make our own instance of a Pool from that template Pool object
//This says how to connect to our database
const pool = new Pool({
    database: 'weekend-to-do-app', //THIS WILL CHANGE -your actual database name goes here
    host: 'localhost', //connect to our local computer
    port: 5432, //port number, this is the default
    max: 10, //max number of connection
    idleTimeoutMillis: 30000 //30 sec
})

//When we connect to the database, run a function 
pool.on('connect', () => {
    console.log('Connected to database');
})
//error message to send back if one couldn't connect
pool.on('error', (error) => {
    console.log('Error from pg', error);
})

//export out pool so you can utilize in music_router.js
module.exports = pool;