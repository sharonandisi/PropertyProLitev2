import Joi from '@hapi/joi';
import response from '../helpers/responses';


class Validation {
    static async validatePostproperty(req, res, next) {
        try {
            const schema = {
                address: Joi.string()
                    .min(3)
                    .max(15)
                    .required()
                    .error(() => "address is required with a min of 3 chars and no special chars or numbers"),

                state: Joi.string()
                    .min(3)
                    .max(15)
                    .required()
                    .error(() => "state required  with a min of 3 chars and no special chars or numbers"),

                city: Joi.string()
                    .alphanum()
                    .min(5)
                    .max(50)
                    .required()
                    .error(() => "city required with a min of 4 chars and no special chars"),

                price: Joi.number()
                    .required()
                    .error(() => "price required with  no special chars or letters"),

                type: Joi.string()
                    .min(3)
                    .max(10)
                    .required()
                    .error(() => "type required with a min of 3 char with no special chars or letters")
            };
            const { error } = Joi.validate(req.body, schema);

            if (error) {
                return response.validationsError(400, error.details[0].message, res);
            }
            next();
        } catch (error) {
            return response.catchErrors(500, error.toString(), res);

        }
    }

   

}


export default Validation;