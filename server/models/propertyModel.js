import uuid from "uuid";
import moment from "moment";

class Property {
    constructor() {
        this.properties = [];
    }

    //  Fetch all properties
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

    // Create and save a property
    create({
        status, price, state, city, address, type, image_url, owner=1, 
    }) {
        console.log(status);
        const newProperty = {
            id: uuid.v4(),
            status,
            price,
            state,
            city,
            address,
            type,
            image_url,
            owner,
            
        };

        this.properties.push(newProperty);

        return newProperty;
    }

    // Get a property by id
    findOne(id) {
        return this.properties.find(property => property.id === id);
    }
    

    // Delete a property
    delete(id) {
        const property = this.findOne(id);
        const index = this.users.indexOf(property);
        this.users.splice(index, 1);
        return {};
    }

    // Update a property
    update(id, data) {
        const property = this.findOne(id);
        const index = this.properties.indexOf(property);
        this.properties[index].id = data.id || property.id;
        return this.properties[index];
    }
    // mark a property as solg
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