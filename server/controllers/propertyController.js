import PropertyModel from "../models/propertyModel";


class Property {

createPropertyAd(req, res) {
    if (!req.body.price && !req.body.state && !req.body.city && !req.body.address && !req.body.type) {
        return res.status(400).json({
            status: 400,
            error: "All field are required"
        });
    }
    const property = PropertyModel.create(req.body);
    return res.status(400).json({
        status: 400,
        data: property
    });
}

/**
 * 
 * @param {uuid} id
 * @returns {object} property object
 */

   


fetchSpecificProperty(req, res) {
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

findAdsOfSpecificType(req, res) {
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

deletePropertyAd(req, res) {
    const property = PropertyModel.findOne(req.params.id);

    if (!property) {
        return res.status(404).json({
            status: 404,
            error: "Property not found",
        });
    }
    const ad = PropertyModel.delete(req.params.id);
    return res.status(204).json({
        status: 204,
        data: ad,
    });
}

fetchMyads (req, res) {
    const id = req.params;
    const properties = PropertyModel.Property.findAllMyAds(id);

    if (properties.length) {
        return res.status(200).json({
            status: 200,
            data: properties,
        });
    }

    if (!properties.length) {
        return res.status(400).json({
            status: 400,
            error: "No properties found!",
        });
    }
}


editPropertyAd(req, res) {
    const property = PropertyModel.findOne(req.params.id);
    if (!property) {
        return res.status(404).json({
            status: 404,
            error:"Property not found" 
        });
    }
    const updateProperty = PropertyModel.update(req.params.id, req.body);
    return res.status(200).json({
        status:200,
        data: updateProperty
    });
}


markPropertySold(req, res) {
    const { id } = req.params;
    const result = PropertyModel.markPropertySold(id);
    if (result) {
    return res.status(200).json({
        status: 200,
        data: result,
    });
    }
    if (!result) 
    return res.status(404).json({
        status: 404,
        error:"Property not found",
    });
}

}

export default Property;