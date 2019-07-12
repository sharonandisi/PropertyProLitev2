import uuid from "uuid";
import moment from "moment";

class Property {
    constructor() {
        this.Properties = [];
    }

    //  Fetch all properties
    findAll() {
        if (this.Properties.length === 0) return false;        
        return this.Properties;
    }

    findAllMyAds(id) {
        return this.Properties.filter(property => property.owner === id);
    }

    findAdsOfSpecificType(type) {
        return this.Properties.filter(property => property.type === type);
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
            owner
        };

        this.Properties.push(newProperty);

        return newProperty;
    }

    // Get a property by id
    findOne(id) {
        return this.Properties.find(id => Property.id === id);
    }

    // Delete a property
    delete(id) {
        // const property = this.findOne(id);
        const newProperties = this.Properties.filter(property => property.id !== id);
        this.Properties = [...newProperties];
        return true;
    }

    // Update a property
    update(id, data) {
        const property = this.findOne(id);
        const index = this.Properties.indexOf(property);

        if (data.price) {
            this.Properties[index].price = data.price;
        }

        if (data.imageUrl) {
            this.Properties[index].imageUrl = data.imageUrl;
        }

        if (data.title) {
            this.Properties[index].title = data.title;
        }

        return this.Properties[index];
    }

    markPropertySold(id) {
        const property = this.findOne(id);
        const index = this.Properties.indexOf(property);
        this.Properties[index].status = "sold";

        return this.Properties[index];
    }

    remove() {
        this.Properties = [];
    }
}

export default new Property();