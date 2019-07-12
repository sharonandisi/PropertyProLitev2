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
            msg: "No adverts found",

        });
    }
};

const findAdsOfSpecificType = (req, res) => {
    let { type } = req.query;
    type = decodeURI(type);
    const properties = models.findAdsOfSpecificType(type);
    res.status(200).json({
        status: "success",
        data: properties,
    });
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
        return res.status(400).json({
            status: "error",
            msg: "Property ad is not found!",
        });
    }
};

const deletePropertyAd = (req, res) => {
    const { id } = req.params;
    const result = models.Property.delete(id);

    if (result) {
        return res.status(200).json({
            status: "success",
            msg: "Property ad is sucessfully deleted",
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
    const { price, title } = req.body;
    const data = {
        title,
        price,
    };
    const result = models.Property.update(id, data);
    res.status(201).json({
        status: "success",
        data: result,
    });
};

const editPropertyAdImage = (req, res) => {
    const { id } = req.params;
    const { image_url } = req;
    const data = {
        image_url,
    };
    const result = models.Property.update(id, data);
    res.status(201).json({
        status: "success",
        data: result,
    });
};

const markPropertySold = (req, res) => {
    const { id } = req.params;
    const result = models.Property.markPropertySold(id);
    res.status(200).json({
        status: "success",
        data: result,
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
    editPropertyAdImage,
    markPropertySold,
};