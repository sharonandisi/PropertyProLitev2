import dotenv from 'dotenv';

dotenv.config()

const env = process.env.NODE_ENV

const DBURL = {
    test: process.env.DATABASE_URL_TEST,
    development: process.env.DATABASE_URL_TEST,
    prod: process.env.DATABASE_URL_TEST,
}

export default DBURL[env];