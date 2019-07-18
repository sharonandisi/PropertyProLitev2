
import jwt from 'jsonwebtoken';
import db from '../db';
import { config } from 'dotenv';

config();

    /**
     * Verify Token
     * @param {object} req
     * @param {object} res
     * @param {object} next
     * @retuns {object|void} response object
     */

const verifyToken= async (req, res, next) => {

        try {
            const headerToken = req.headers.authorization;
            if (!headerToken) {
                return res.status(400).json({
                    status: 400,
                    error: "Token is not provided"
                });
            }
            const token = headerToken.split(' ')[1];
            
            await jwt.verify(token, process.env.SECRET, (err, data) => {
                if (err) return res.status(403).json({
                    status: 400,
                    error: err.message
                })
                res.locals.user = data
                
            });
            next();
        } catch (error) {
            return res.status(400).json({
                status: 400,
                error: "Bad request"
            });
        }   
}

export default verifyToken;