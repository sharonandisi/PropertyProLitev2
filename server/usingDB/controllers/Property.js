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
         properties(status, type, state, city, address, price, created_on, image_url, owneremail, owner_id)
         VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         returning *`;

         const values = [
             req.body.status,
             req.body.type,
             req.body.state,
             req.body.city,
             req.body.address,
             req.body.price,
             req.user.id,
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
     },


    /**
     * Get All properties
     * @param {object} req 
     * @param {object} res 
     * @returns {object} properties array
     */


    async getAll(req, res) {
        const findAllQuery = 'SELECT * FROM properties where owner_id = $1';
        try {
            const { rows, rowCount } = await db.query(findAllQuery, [req.user.id]);
            return res.status(200).json({
                status: 200,
                message: "Success", 
                data: rows, rowCount });
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
        const text = 'SELECT * FROM properties WHERE id = $1 AND owner_id = $2';
        try {
            const { rows } = await db.query(text, [req.params.id, req.user.id]);
            if (!rows[0]) {
                return res.status(404).json({
                    status: 404, 
                    error: 'reflection not found' });
            }
            return res.status(200).json({
                status: 200,
                message: "Success",
                data:rows[0]
            });
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
        const text = 'SELECT * FROM properties WHERE id = $1 AND owner_id = $2  AND type = $3';
        try {
            const { rows } = await db.query(text, [req.params.id, req.type, req.user.id]);
            if (!rows[0]) {
                return res.status(404).json({ 
                    status: 404,
                    error : 'reflection not found' });
            }
            return res.status(200).json({
                status: 200,
                message: "Success",
                data:rows[0]
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
        const findOneQuery = 'SELECT * FROM properties WHERE id=$1 AND owner_id = $2';
        const updateOneQuery = `UPDATE properties
      SET state=$1,city=$2,address=$3,price=$4
      WHERE id=$5 AND owner_id = $6 returning *`;
        try {
            const { rows } = await db.query(findOneQuery, [req.params.id, req.user.id]);
            if (!rows[0]) {
                return res.status(404).json({ 
                    status: 400,
                    error: 'property not found' });
            }
            const values = [
                req.body.state || rows[0].state,
                req.body.city || rows[0].city,
                req.body.address || rows[0].address,
                req.body.price || rows[0].price,
                moment(new Date()),
                req.params.id,
                req.user.id
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
        const deleteQuery = 'DELETE FROM properties WHERE id=$1 AND owner_id = $2 returning *';
        try {
            const { rows } = await db.query(deleteQuery, [req.params.id, req.user.id]);
            if (!rows[0]) {
                return res.status(404).json({ 
                    status: 404,
                    error : 'property not found' });
            }
            return res.status(204).json({ 
                status: 204,
                error: 'property is deleted' });
        } catch (error) {
            return res.status(400).json({
                status: 400,
                error: 'Bad request'
            });
        }
    }


    
};

export default Property;