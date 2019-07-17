const  { Pool } = require ("pg");
const  dotenv = require ("dotenv");



dotenv.config();


const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

pool.connect();

/**
 * Create Tables
 */

const createTables = () => {
    const queryText = 
        `CREATE TABLE IF NOT EXISTS 
            properties(
                id SERIAL PRIMARY KEY,
                status VARCHAR(128) NOT NULL,
                price VARCHAR(128) NOT NULL,
                state VARCHAR(128) NOT NULL,
                city VARCHAR(128) NOT NULL,
                address VARCHAR(128) NOT NULL,
                type VARCHAR(128) NOT NULL,
                image_url VARCHAR(128),
                owneremail VARCHAR(128) NOT NULL,
                created_on TIMESTAMP NOT NULL DEFAULT NOW()
            );`;

    pool.query(queryText)
        .then((res) => {
            pool.end();
        })
        .catch((err) => {
            pool.end();
        });
 };


 /**
  * Create User Table
  */
const createUserTable = () => {
    const queryText =
    `CREATE TABLE IF NOT EXISTS
    users(
        id SERIAL PRIMARY KEY,
        email VARCHAR(128) UNIQUE NOT NULL,
        password VARCHAR(256) NOT NULL,
        phoneNumber VARCHAR(128) NOT NULL,
        address VARCHAR(128) NOT NULL,
        is_admin VARCHAR(128) NOT NULL 
    )`;

    pool.query(queryText)
        .then((res) => {
            pool.end();
        })
        .catch((err) => {
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
            pool.end();
        })
        .catch((err) => {
            pool.end();
        });
};


const dropUserTables = () => {
    const queryText = 'DROP TABLE IF EXISTS users returning *';
    pool.query(queryText)
        .then((res) => {
            pool.end();
        })
        .catch((err) => {
            pool.end();
        });
};

/**
 * Create All Tables
 */
const createAllTables = () => {
    createUserTable();
    createTables();
};

/**
 * Drop all tables
 */

const dropAllTables = () => {
    dropUserTables();
    dropTables();
}

pool.on('remove', () => {
    process.exit(0);
});

module.exports = {
    createTables,
    createUserTable,
    createAllTables,
    dropUserTables,
    dropTables,
    dropAllTables
};

require ("make-runnable");

