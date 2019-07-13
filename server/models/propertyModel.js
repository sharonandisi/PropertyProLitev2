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
        const index = this.properties.indexOf(property);
        this.properties.splice(index, 1);
        
    }

    // Update a property
    update(id, data) {
        let property;
        if(!property => property.id === data.id){
            return false;
        }
        property.price = data.price;
        console.log(property);
        return property;
        }
         
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