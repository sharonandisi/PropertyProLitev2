import moment from "moment";
import db from "../db";
import "@babel/polyfill";



const Property = {
    /**
     * Create A property
     * @param {object} req
     * @param {object} res
     * @returns {object} property object
     */


     async create(req, res) {
         const text = `INSERT INTO
         properties(status, type, state, city, address, price, created_on, image_url, owneremail)
         VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
         returning *`;

         const values = [
             req.body.status,
             req.body.type,
             req.body.state,
             req.body.city,
             req.body.address,
             req.body.price,
             moment(new Date()),
             req.image_url,
             req.body.owneremail
        
         ];

         try {
             const { rows } = await db.query(text, values);
             return res.status(201).json({
                 status: 201,
                 message: "Property was successfully posted",
                 data: rows[0]

             });
         } catch(error) {
             return res.status(400).json({
                 status: 400,
                 error: "Bad request"
             });
         }
     }
};

export default Property;