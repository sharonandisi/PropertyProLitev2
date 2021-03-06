import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const authHelper = {
    /**
     * Hash Password Method
     * @param {string} password
     * @returns {string} retuns hashed password
     * 
     */

     hashPassword(password) {
         return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
     },


     /**
      * comparePassword
      * @param {string} hashPassword
      * @param {string} password
      * @returns {Boolean}
      */

      comparePassword(hashPassword, password) {
          return bcrypt.compareSync(password, hashPassword);
      },

      /**
       * isValidEmail helper method
       * @param {string} email
       * @returns {Boolean} True or false
       */

       isValidEmail(email){
           return /\S+@\S+\.\S+/.test(email);
       },

       /**
        * Generate Token
        * @param {string} is
        * @returns {string} token
        */

        generateToken(payload) {
            const token = jwt.sign(payload,
                process.env.SECRET, {expiresIn: '7d'}
            );
            return token;
        }
}

export default authHelper;