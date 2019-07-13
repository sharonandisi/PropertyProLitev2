import models from "../models/propertyModel";

const createPropertyAd = (req, res) => {
    const { image_url } = req;

    const {
        address, state, city, type, price,
    } = req.body;
    address.trim();
    state.trim();
    city.trim();
    type.trim();

    const data = {
        image_url,
        address,
        state,
        city,
        type,
        price,
        status: "available",
    };

    console.log(models.create(data));
    const result = models.create(data);

    res.status(201).json({
        status: "success",
        data: result,
    });
};

const fetchAllProperties = (req, res) => {

    const properties = models.findAll();

    if (properties) {
    return res.status(200).json({
        status: "success",
        data: properties,
    });
    }

    if (!properties) {
        return res.status(404).json({
            status: "error",
            error: "No adverts found",

        });
    }
};

const findAdsOfSpecificType = (req, res) => {
    let { type } = req.query;
    // type = decodeURI(type);
    const properties = models.findAdsOfSpecificType(type);
console.log(properties.length);

    if (properties.length>0) {
        return res.status(200).json({
            status: "success",
            data: properties,
        });    
    }
    else  {
        return res.status(404).json({
            status: "error",
            error: "No property adverts of that type found"
        });
    }
    
};

const fetchSpecificProperty = (req, res) => {
    const { id } = req.params;
    const result = models.findOne(id);

    if (result) {
        return res.status(200).json({
            status: "success",
            data: result,
        });
    }

    if (!result) {
        return res.status(404).json({
            status: "error",
            error: "property not found",
        });
    }
};

const deletePropertyAd = (req, res) => {
    const { id } = req.params;
    const result = models.Property.findOne(id);
    console.log(id);
    

    if (result) {
        return res.status(200).json({
            status: "success",
            data: "Property ad is sucessfully deleted",
        });
    }
    if (!result) {
        return res.status(404).json({
            status: 404,
            error: "Property not found"
        });
    }
};

const fetchMyads = (req, res) => {
    const id = req.decoded.payload;
    const properties = models.Property.findAllMyAds(id);

    if (properties.length) {
        return res.status(200).json({
            status: "success",
            data: properties,
        });
    }

    if (!properties.length) {
        return res.status(400).json({
            status: "error",
            msg: "No properties found!",
        });
    }
};
const editPropertyAd = (req, res) => {
    const { id } = req.params;
    const { price } = req.body;
    const data = price.req.body;
    const result = models.Property.update(id, data);
    res.status(201).json({
        status: "success",
        data: result,
    });
    if(!result) {
        return res.status(404).json({
            status: 404,
            data: result,
        });
    }
    if(result) {
        return res.status(200).json({
            status: "success",
            data: result,
        });
    }
};


const markPropertySold = (req, res) => {
    const { id } = req.params;
    const result = models.markPropertySold(id);
    if (result) {
    return res.status(200).json({
        status: "success",
        data: result,
    });
    }
    if (!result) 
    return res.status(404).json({
        status: 404,
        msg: "property not found",
    });
};

export {
    createPropertyAd,
    fetchAllProperties,
    fetchSpecificProperty,
    deletePropertyAd,
    fetchMyads,
    findAdsOfSpecificType,
    editPropertyAd,
    markPropertySold,
};