import  db from "../db";
import authHelper from "../helpers/auth";




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
                 error:"Email is a required field and must be valid"
             })
         }
         const password = authHelper.hashPassword(req.body.password);

         const createQuery = `INSERT INTO
         users(email, first_name, last_name, password, phoneNumber, address)
         VALUES($1, $2, $3, $4, $5, $6)
         returning *`;
         const values = [
             req.body.email,
             req.body.first_name,
             req.body.last_name,
             password,
             req.body.phoneNumber,
             req.body.address
            ];
        try {
            const { rows } = await db.query(createQuery, values);
            const token = authHelper.generateToken({ id:rows[0].id, email:rows[0].id });
            return res.status(201).json({
                status: 201,
                message:"Successfully signed up",
                token,
                data: ({
                    email:rows[0].email,
                    first_name:rows[0].first_name,
                    last_name: rows[0].last_name,
                    phoneNumber: rows[0].phoneNumber,
                    address:rows[0].address,
                }),

            })
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
     },


    /**
    * Login
    * @param {object} req
    * @param {object} res
    * @returns {object} user object
    */

    async login(req, res) {
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({ 
                status: 400,
                error: 'Some values are missing'
             });
        }
        if (!authHelper.isValidEmail(req.body.email)) {
            return res.status(400).json({
                status: 400, 
                error: 'Please enter a valid email address' 
            });
        }
        const text = 'SELECT * FROM users WHERE email = $1';
        try {
            const { rows } = await db.query(text, [req.body.email]);
            if (!rows[0]) {
                return res.status(400).json({ 
                    status: 400,
                    error: 'The credentials you provided are incorrect' 
                });
            }
            if (!authHelper.comparePassword(rows[0].password, req.body.password)) {
                return res.status(400).json({
                    status: 400, 
                    error: 'The credentials you provided is incorrect' 
                });
            }
            const token = authHelper.generateToken({ id: rows[0].id, email:rows[0].email});
            return res.status(200).json({ 
                status: 200,
                message: "Successfully logged in",
                token,
                data: ({
                    email:rows[0].email
                })
             })
        } catch (error) {
            return res.status(400).json({
                status: 400,
                error: "Bad request"
            })
        }
    }


}

export default User;