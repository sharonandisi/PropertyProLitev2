import Joi from '@hapi/joi';
import response from '../helpers/responses';


class Validations {
    static async validateSignup(req, res, next) {
        try {
            const schema = {
                firstname: Joi.string()
                    .min(3)
                    .max(15)
                    .required()
                    .error(() => 'Firstname is required with a min of 3 chars and no special chars or numbers'),

                lastname: Joi.string()
                    .min(3)
                    .max(15)
                    .required()
                    .error(() => 'Lastname required  with a min of 3 chars and no special chars or numbers'),

                address: Joi.string()
                    .alphanum()
                    .min(5)
                    .max(50)
                    .required()
                    .error(() => 'Address required with a min of 4 chars and no special chars'),

                phoneNumber: Joi.string()
                    .min(10)
                    .max(10)
                    .required()
                    .error(() => 'phoneNumber required with a min of 10 numbers with no special chars or letters'),

                email: Joi.string()
                    .email({ minDomainSegments: 2 }).required()
                    .error(() => 'Email required field and must be valid'),

                password: Joi.string()
                    .min(5)
                    .max(15)
                    .alphanum()
                    .required()
                    .error(() => 'Password required with a min of 5 chars and no special chars'),

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

    static async validateLogin(req, res, next) {
        try {
            const schema = {
                email: Joi.string()
                    .email({ minDomainSegments: 2 }).required()
                    .error(() => "Email is a required field and must be valid"),
                password: Joi.string()
                    .min(5)
                    .max(15)
                    .alphanum()
                    .required()
                    .error(() => "Password is a required field with a min of 5 chars and no special chars"),
            };
            const { error } = Joi.validate(req.body, schema);

            if (error) {
                return response.validationsError(400, error.details[0].message, res);
            }
            next();
        } catch (e) {
            return response.catchErrors(500, e.toString(), res);
        }
    }

}


export default Validations;