import  { Pool } from "pg";
import dotenv from "dotenv";
import config from "./config";



dotenv.config();

const env = process.env.NODE_ENV

const databaseUrl = env === 'test' ? process.env.DATABASE_URL_TEST : process.env.DATABASE_URL

console.log(config)
const pool = new Pool({
    connectionString: databaseUrl
});

pool.connect();


 /**
  * Create User Table
  */
const createUserTable = () => {
    const queryText =
    `CREATE TABLE IF NOT EXISTS
    users(
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(128) NOT NULL,
        last_name VARCHAR(128) NOT NULL,
        email VARCHAR(128) UNIQUE NOT NULL,
        password VARCHAR(256) NOT NULL,
        phoneNumber VARCHAR(128) NOT NULL,
        address VARCHAR(128) NOT NULL,
        is_admin BOOL DEFAULT 'false' 
    )`;

    pool.query(queryText)
        .then((res) => {
            pool.end();
        })
        .catch((err) => {
            pool.end();
        });
};

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
        owner VARCHAR REFERENCES users(email) ON DELETE CASCADE,
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

 /*
  * DropTables
  */


const dropTables = () => {
    const queryText = 'DROP TABLE IF EXISTS properties CASCADE';
    pool.query(queryText)
        .then((res) => {
            pool.end();
        })
        .catch((err) => {
            pool.end();
        });
};


const dropUserTables = () => {
    const queryText = 'DROP TABLE IF EXISTS users CASCADE';
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

export {
    createTables,
    createUserTable,
    createAllTables,
    dropUserTables,
    dropTables,
    dropAllTables
};

require ('make-runnable');

