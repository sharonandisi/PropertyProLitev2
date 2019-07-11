import UserModel from '../models/userModel';


const User = {
    /**
     * 
     * @param {object} req
     * @param {object} res
     * @returns {object} user object
     */

     create(req, res) {
         if (!req.body.email && !req.body.firstname && !req.body.lastname && !req.body.password && !req.body.phoneNumber && !req.body.address && !req.body.is_Agent) {
             return res.status(400).send({"message":"All fields are required"})
         }
         const user = UserModel.create(req.body);
         return res.status(201).send(user);
     },

     /**
      * @param {object} req
      * @param {object} res
      * @returns {object} user array
      */

      getAll(req, res) {
          const user = UserModel.findAll();
          return res.status(200).send(users);
      },

      /**
       * 
       * @param {object} req
       * @param {object} res
       * @returns {void} return status code 204
       */
      delete(req,res) {
          const user = UserModel.findOne(req.params.id);
          if (!user) {
              return res.status(404).send({"message":"user not found"})
          }
          const ref = UserModel.delete(req,params.id);
          return res.status(204).send(ref);
      }
}

export default User;