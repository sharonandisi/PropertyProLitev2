
import PropertyModel from "../models/propertyModel";


class Property {

        static async createPropertyAd(req, res) {
            if (!req.body.price && !req.body.state && !req.body.city && !req.body.address && !req.body.type) {
                return res.status(400).json({
                    status: 400,
                    error: "All field are required"
                });
            }
            const property = PropertyModel.create(req.body);
            return res.status(201).json({
                status: 201,
                data: property
            });
        }

        /**
         * 
         * @param {uuid} id
         * @returns {object} property object
         */

        


        static async fetchSpecificProperty(req, res) {
            const property = PropertyModel.findOne(req.params.id);
            if (!property) {
            return res.status(404).json({
                status: 404,
                error: "property not found",
            });
            }
            return res.status(200).json({
                status: 200,
                data: property
            });
        }

        static async fetchAllProperties(req, res) {

            const properties = PropertyModel.findAll(req.params.id);

            if (properties.length>0) {
                return res.status(200).json({
                    status: 200,
                    data: properties,
                });
            }
            else {
                return res.status(404).json({
                    status: 404,
                    error: "No adverts found"
                });
            }

        }

        static async findAdsOfSpecificType(req, res) {
            let { type } = req.query;
            const properties = PropertyModel.findAdsOfSpecificType(type);

            if (properties.length>0) {
                return res.status(200).json({
                    status: 200,
                    data: properties,
                });    
            }
            else  {
                return res.status(404).json({
                    status: 404,
                    error: "No property adverts of that type found"
                });
            }
            
        }

        static async deletePropertyAd(req, res) {
            
            const properties = PropertyModel.delete(req.params.id);

            if (properties) {
                return res.status(200).json({
                    status: 200,
                    data: properties,
                });
            }

            if (!properties) {
                return res.status(404).json({
                    status: 404,
                    error: "You have no advert with that Id",
                });
            }
        }


        static async editPropertyAd(req, res) {
            const property = PropertyModel.findOne(req.params.id);
            
            if (property){
            const updateProperty = PropertyModel.update(req.params.id, req.body);
            return res.status(200).json({
                status:200,
                data: updateProperty
            });
            }
            if (!property){
            return res.status(404).json({
                status:400,
                error:"No property found"
            });
            }
            
        }


        static async markPropertySold(req, res) {
            const { id } = req.params;
            const result = PropertyModel.markPropertySold(id);
            if (result) {
            return res.status(200).json({
                status: 200,
                data: result,
            });
            }
            if (!result) {
            return res.status(404).json({
                status: 404,
                error:"Property not found",
            });
        }
        }

}

export default Property;

