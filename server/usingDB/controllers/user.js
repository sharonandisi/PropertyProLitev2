import  db from "../db";
import authHelper from "../helpers";
import { create } from "domain";



const User = {

    /**
     * Create A user
     * @param {object} req
     * @param {object} res
     * @returns {object} user object
     */
    
     async create(req, res) {
         if (!req.body.email && !first_name && !last_name && !password && !phoneNumber && !address ){
             return res.status(400).json({
                 status: 400,
                 error: "All fields are required"
             })
         }
         if (!authHelper.isValidEmail(req.body.email)) {
             return res.status(400).json({
                 status: 400,
                 error:"Please enter a valid email address"
             })
         }
         const hashPassword = Helper.hashPassword(req.body.password);

         const createQuery = `INSERT INTO
         users(email, first_name, last_name, password, phoneNumber, address)
         VALUES($1, $2, $3, $4, $5, $6)
         returning *`;

         const values = [
             req.body.email,
             req.body.first_name,
             req.body.last_name,
             req.body.password,
             req.body.phoneNumber,
             req.body.address
            ];

        try {
            const { rows } = await db.query(createQuery, values);
            const token = authHelper.generateToken(rows[0].id);
            return res.status(201).json({
                status: 201,
                message:"Successfully signed up",
                token,
                data: (
                    rows[0].email,
                    rows[0].first_name,
                    rows[0].last_name,
                    rows[0].phoneNumber,
                    rows[0].address
                )

            });
        } catch(error) {
            if(error.routine === '_bt_check_unique'){
                return res.status(400).json({
                    status: 400,
                    error: "Email already in use"
                })
            }
            return res.status(400).json({
                status: 400,
                error: "Bad request"

            })
        }
     }
}