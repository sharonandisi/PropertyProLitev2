import moment from "moment";
import uuidv4 from "uuid/v4";
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
         properties(id, status, type, state, city, address, price, created_on, image_url)
         VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
         returning *`;

         const values = [
             uuidv4(),
             req.body.status,
             req.body.type,
             req.body.state,
             req.body.city,
             req.body.address,
             req.body.price,
             moment(new Date()),
             req.image_url
        
         ];
         console.log(req.body.status);
         console.log(values);

         try {
             const { rows } = await db.query(text, values);
             console.log(rows);
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