import moment from "moment";
import db from "../db";
import "@babel/polyfill";
import Auth from "../middleware/authen";




const Property = {
    /**
     * Create A property
     * @param {object} req
     * @param {object} res
     * @returns {object} property object
     */


     async create(req, res) {
        try {
         const createQuery = `INSERT INTO
         properties(status, type, state, city, address, price, created_on, image_url, owner)
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
             res.locals.user.email
        
         ];
             const { rows } = await db.query(createQuery, values);
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
     },


    /**
     * Get All properties
     * @param {object} req 
     * @param {object} res 
     * @returns {object} properties array
     */


    async getAll(req, res) {
        const findAllQuery = 'SELECT * FROM properties';
        try {
            const { rows } = await db.query(findAllQuery);
            return res.status(200).json({
                status: 200,
                message: "Success", 
                data: rows
            });
        } catch (error) {
            return res.status(400).json({
                status: 400,
                error: "Bad request"
            });
        }
    },

    /**
     * Get A Property
     * @param {object} req
     * @param {object} res
     * @returns {object} property object
     */


    async getOne(req, res) {
        const text = 'SELECT * FROM properties WHERE id = $1';
        try {
            const { rows } = await db.query(text, [req.params.id]);
            if (!rows[0]) {
                return res.status(404).json({
                    status: 404, 
                    error: 'property not found' });
            }
            return res.status(200).json({
                status: 200,
                message: "Success",
                data:rows[0]
            })
        } catch (error) {
            return res.status(400).json({
                status: 400,
                error: "Bad request"
            })
        }
    },


    /**
    * Get A Specific Property Type
    * @param {object} req
    * @param {object} res
    * @returns {object} property object
    */



    async getType(req, res) {
        const text = 'SELECT * FROM properties ';
        try {
            const { rows } = await db.query(text);
            if (!rows) {
                return res.status(404).json({ 
                    status: 404,
                    error : 'reflection not found' });
            }
            return res.status(200).json({
                status: 200,
                message: "Success",
                data:rows
            });
        } catch (error) {
            return res.status(400).json({
                status: 400,
                error:"Bad request"
            })
        }
    },


    /**
    * Update A Property
    * @param {object} req 
    * @param {object} res 
    * @returns {object} updated property
    */


    async update(req, res) {
        const findOneQuery = 'SELECT * FROM properties WHERE id=$1 AND owner = $2';
        const updateOneQuery = `UPDATE properties
      SET price=$1 WHERE id=$2 AND owner = $3`;
        try {
            const { rows } = await db.query(findOneQuery, [req.params.id, req.owner]);
            if (!rows[0]) {
                return res.status(404).json({ 
                    status: 404,
                    error: 'property not found' });
            }
            const values = [
                req.body.price || rows[0].price,
                req.params.id,
                res.locals.user.email
            ];
            const response = await db.query(updateOneQuery, values);
            return res.status(200).json({
                status: 200,
                message: "successfully updated",
                data: response.rows[0]
            });
        } catch (err) {
            return res.status(400).json({
                status: 400,
                error: 'Bad request'
            });
        }
    },


    /**
    * Delete A Property
    * @param {object} req 
    * @param {object} res 
    * @returns {void} return status code 204 
    */


    async delete(req, res) {
        const deleteQuery = 'DELETE FROM properties WHERE id=$1';
        try {
            const { rows } = await db.query(deleteQuery, [req.params.id]);
            if (!rows[0]) {
                return res.status(404).json({ 
                    status: 404,
                    error : 'property not found' });
            }
            return res.status(204).json({ 
                status: 204,
                message: 'property is deleted' 
            });
        } catch (error) {
            return res.status(400).json({
                status: 400,
                error: 'Bad request'
            });
        }
    }


    
};

export default Property;