const  { Pool } = require ("pg");
const  dotenv = require ("dotenv");


dotenv.config();


const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});


pool.on('connect', () => {
    console.log("connected to the db");
});

/**
 * Create Tables
 */

 const createTables = () => {
    const queryText = 
        `CREATE TABLE IF NOT EXISTS
        properties(
            id UUID PRIMARY KEY,
            status VARCHAR(128) NOT NULL,
            price VARCHAR(128) NOT NULL,
            state VARCHAR(128) NOT NULL,
            city VARCHAR(128) NOT NULL,
            address VARCHAR(128) NOT NULL,
            type VARCHAR(128) NOT NULL,
            image_url VARCHAR(128),
    
        )`;

    pool.query(queryText)
        .then((res) => {
                console.log(res);
                pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
 };

 /*
  * DropTables
  */


const dropTables = () => {
    const queryText = 'DROP TABLE IF EXISTS properties';
    pool.query(queryText)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
}


pool.on('remove', () => {
    console.log("client removed");
    process.exit(0);
});

module.exports = {
    createTables,
    dropTables
};
require ("make-runnable");

