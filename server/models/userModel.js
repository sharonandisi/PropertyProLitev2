import moment from "moment";
import uuid from "uuid";


class User {
    /**
     * class constructor
     * @param {object} data
     */

    constructor() {
        this.users = [];
    }

    /**
     * 
     * @returns {object} reflection object
     */

    create(data) {
        const newUser = {
            id: uuid.v4(),
            email: data.email || '',
            firstname: data.firstname || '',
            lastname: data.lastname || '',
            password: data.password || '',
            phoneNumber: data.phoneNumber ||
            '',
            address: data.address || '',
            is_Agent: data.is_Agent || '',
        };
        this.users.push(newUser);
        return newUser
    }

    /**
     * @param {uuid} id
     * @returns {object} user object
     */

     findOne(id) {
         return this.users.find(user => user.id === id);   
     }

     /**
      * @returns {object} returns all reflections
      */

      findAll() {
          return this.reflections;
      }

      /**
       * @param {uuid} id
       * @param {object} data
       */

       update(id, data) {
           const user = this.findOne(id);
           const index = this.users.indexOf(user);
           this.users[index].email = data['email'] || user.email;
           this.users[index].firstname = data['firstname'] || user.firstname;
           this.users[index].lastname = data['lastname'] || user.lastname;
           this.users[index].phoneNumber = data['phoneNumber'] || user.phoneNumber;
           this.users[index].address = data['address'] || user.address;
           return this.users[index];

       }

       /**
        * 
        * @param {uuid} id
        */

        delete(id) {
            const user = this.findOne(id);
            const index = this.users.indexOf(user);
            this.users.splice(index,1);
            return {};
        }
}
export default new User();