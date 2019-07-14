import uuid from "uuid";


class Property {
    /**
     * class constructor
     * @param {object} data
     */

    constructor() {
        this.properties = [];
    }

    /**
     * @returns {object} returns all properties
     */

    findAll() {
        if (this.properties.length === 0) return false;        
        return this.properties;
    }

    findAllMyAds(id) {
        return this.properties.filter(property => property.owner === id);
    }

    findAdsOfSpecificType(type) {
        const property = this.properties.filter(property => property.type === type);
        if (!property) {
            return false;
        }
        return property;
    }

    /**
     * 
     * @returns {object} 
     */
    create(data) {
        const newProperty = {
            id: uuid.v4(),
            status: "available",
            price: data.price || "",
            state: data.state || "",
            city: data.city || "",
            address: data.address || "",
            type: data.type || "",
            image_url: data.image_url || "",
            owner: data.owner || 1,
        };

        this.properties.push(newProperty);

        return newProperty;
    }

    /**
     * 
     * @param {uuid} id 
     * @returns {object} property object
     */

    
    findOne(id) {
        return this.properties.find(property => property.id === id);
    }

    /**
     * 
     * @param {uuid} id 
     */
    
    delete(id) {
        const property = this.findOne(id);
        const index = this.properties.indexOf(property);
        this.properties.splice(index, 1);
        return true;
    }
    /**
     * 
     * @param {uuid} id 
     * @param {object} data 
     */


    update(id, data) {

        this.properties[index].price = data["price"];

        return this.properties[index];
    }

    /**
     * 
     * @param {uuid} id 
     * @param {object} data
     */
    markPropertySold(id) {
        const property = this.findOne(id);
        const index = this.properties.indexOf(property);
        this.properties[index].status = "sold";

        return this.properties[index];
    }

    remove() {
        this.properties = [];
    }
}

export default new Property;