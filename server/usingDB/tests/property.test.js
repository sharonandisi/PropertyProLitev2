import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';


const { expect } = chai;
chai.should();
chai.use(chaiHttp);

describe('/POST property', () => {
    it("should successfully post a proeprty", (done) =>{
        chai.request(app)
        .post('/api/v1/property')
        .send({
                "status": "Available",
                "price": "70000000",
                "state": "Karen",
                "city": "Nairobi",
                "address": "Kenya",
                "type": "bungalow",
                "image_url": "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?cs=srgb&dl=architecture-beautiful-exterior-106399.jpg&fm=jpg"
            })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    })

    it("should not post a property missing price", (done) => {
        chai.request(app)
            .post('/api/v1/property')
            .send({
                "status": "Available",
                "price": " ",
                "state": "Karen",
                "city": "Nairobi",
                "address": "Kenya",
                "type": "bungalow",
                "image_url": "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?cs=srgb&dl=architecture-beautiful-exterior-106399.jpg&fm=jpg"
            })
            .end((err, res) => {
                res.should.have.status(400);
                if (err) return done();
                done();
            });
    });

    it("should not post a property missing state", (done) => {
        chai.request(app)
            .post('/api/v1/property')
            .send({
                "status": "Available",
                "price": 700000000,
                "state": " ",
                "city": "Nairobi",
                "address": "Kenya",
                "type": "bungalow",
                "image_url": "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?cs=srgb&dl=architecture-beautiful-exterior-106399.jpg&fm=jpg"
            })
            .end((err, res) => {
                res.should.have.status(400);
                if (err) return done();
                done();
            });
    });

    it("should not post a property missing city", (done) => {
        chai.request(app)
            .post('/api/v1/property')
            .send({
                "status": "Available",
                "price": 70000000,
                "state": "Karen",
                "city": " ",
                "address": "Kenya",
                "type": "bungalow",
                "image_url": "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?cs=srgb&dl=architecture-beautiful-exterior-106399.jpg&fm=jpg"
            })
            .end((err, res) => {
                res.should.have.status(400);
                if (err) return done();
                done();
            });
    });

    it("should not post a property missing address", (done) => {
        chai.request(app)
            .post('/api/v1/property')
            .send({
                "status": "Available",
                "price": 70000000,
                "state": "Karen",
                "city": "Nairobi",
                "address": " ",
                "type": "bungalow",
                "image_url": "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?cs=srgb&dl=architecture-beautiful-exterior-106399.jpg&fm=jpg"
            })
            .end((err, res) => {
                res.should.have.status(400);
                if (err) return done();
                done();
            });
    });

    it("should not post a property missing type", (done) => {
        chai.request(app)
            .post('/api/v1/property')
            .send({
                "status": "Available",
                "price": " ",
                "state": "Karen",
                "city": "Nairobi",
                "address": "Kenya",
                "type": " ",
                "image_url": "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?cs=srgb&dl=architecture-beautiful-exterior-106399.jpg&fm=jpg"
            })
            .end((err, res) => {
                res.should.have.status(400);
                if (err) return done();
                done();
            });
    });
})


describe('/GET specific property', () => {
    it('should return an error no advert of that id exists', (done) => {
        chai.request(app)
            .get('/api/v1/property/111')
            .end((err, res) => {
                res.should.have.status(404);
                if (err) return done();
                done();
            });
    });


});
describe('/GET specific property type', () => {
    it("should return an error no advert of that type exists", (done) => {
        chai.request(app)
            .get('/api/v1/property?type=dog')
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });



});

describe('/GET all properties', () => {
    it('should return an error message if no adverts exist', (done) => {
        chai.request(app)
            .get('/api/v1/properties')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});

