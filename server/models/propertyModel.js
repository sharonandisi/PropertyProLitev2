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
        status, price, state, city, address, type, image_url, owner=1, owneremail="shay@gmail.com"
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
            owneremail
        };

        this.properties.push(newProperty);

        return newProperty;
    }

    // Get a property by id
    findOne(id) {
        const property = this.properties.find(property => property.id === id);
        
        if (!property) {
            return false;         
        }
        return property;
    }
    

    // Delete a property
    delete(id) {
        const owneremail = this.properties.filter(property => property.owneremail == owneremail);
        const newProperties = this.properties.filter(property => property.id === id);
        if (newProperties && owneremail){
        return this.properties.pop(newProperties);
        }
        return false;
    }

    // Update a property
    update(id, data) {
        const property = this.findOne(id);
        const index = this.properties.indexOf(property);

        if (data.price) {
            this.properties[index].price = data.price;
            console.log(this.properties[index]);
        return this.properties[index];
        }
        return false;
    }

    markPropertySold(id) {
        const property = this.findOne(id);
        if (property) {
        const index = this.properties.indexOf(property);
        this.properties[index].status = "sold";

        return this.properties[index];
        }
        return false;
    }

    remove() {
        this.properties = [];
    }
}

export default new Property;