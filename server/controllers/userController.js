import UserModel from "../models/userModel";


const User = {
    /**
     * 
     * @param {object} req
     * @param {object} res
     * @returns {object} user object
     */

     create(req, res) {
        if (!req.body.email && !req.body.firstname && !req.body.lastname && !req.body.password && !req.body.phoneNumber && !req.body.address && !req.body.is_Agent) {
            return res.status(400).json({
                status:400,
                error:"All fields are required"});
         }
        const user = UserModel.create(req.body);
        return res.status(201).json({
            status: 201, 
            data: user
            });
     },

     /**
      * @param {object} req
      * @param {object} res
      * @returns {object} user array
      */
      
      userlogin(req, res) {
          const user = UserModel.findByEmail(req.body.email);
          if(!user){
              return res.status(404).json({
                 status: 404,
                 error: "user not found" 
                });
          }
          if(req.body.password !== user.password){
              return res.status(401).json({ 
                status: 401,
                error: "Invalid credentials", 
             });
          }
          return res.status(201).json({message: "successfully logged in"});
        },
        
};

export default User;