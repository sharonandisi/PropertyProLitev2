import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';


const { expect } = chai;
chai.should();
chai.use(chaiHttp);

let token;
let owner;
let id;

describe('/POST property', () => {
    const user = {
        email: 'andi@gmail.com',
        first_name: 'sharton',
        last_name: 'andijhi',
        password: 'wer123456',
        phoneNumber: '0702317926',
        address: 'iowra'
    };
    before((done) => {
        chai.request(app)
            .post('/api/v1/auth/signup')
            .send(user)
            .end((err, res) => {
                console.log(res)
                token = res.body
                done()
            })
    })
    it('should successfully post a property advert', (done) => {
        chai.request(app)
            .post('/api/v1/property')
            .set('Authorization', `Bearer ${token}`)
            .field({
                "status": "Available",
                "price": "70000000",
                "state": "Karen",
                "city": "Nairobi",
                "address": "Kenya",
                "type": "bungalow",
                "image_url": "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?cs=srgb&dl=architecture-beautiful-exterior-106399.jpg&fm=jpg"
            })
            .end((err, res) => {
                res.should.have.status(201);
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
            .get('/api/v1/property?type=massionette')
            .end((err, res) => {
                res.should.have.status(404);
                if (err) return done();
                done();
            });
    });



});

describe('/GET all properties', () => {
    it('should return an error message if no adverts exist', (done) => {
        chai.request(app)
            .get('/api/v1/properties')
            .end((err, res) => {
                res.should.have.status(404);
                if (err) return done();
                done();
            });
    });
});

describe('/PATCH update-property', () => {
    before("should successfully post a property advert", (done) => {
        chai.request(app)
            .post('/api/v1/property')
            .send({
                price: 70000000,
            })
            .end((err, res) => {
                id = res.body.data.id;
                if (err) return done();
                done();
            });
    });

    it("should successfully update a  property advert", (done) => {
        chai.request(app)
            .patch(`/api/v1/property/${id}`)
            .end((err, res) => {
                res.should.have.status(200);
                if (err) return done();
                done();
            });
    });

    it("should not update a property that does not exist", (done) => {
        chai.request(app)
            .patch('/api/v1/property/1')
            .end((err, res) => {
                res.should.have.status(404);
                expect(res.body.error).equals("No property found");
                if (err) return done();
                done();
            });
    });

});

describe('/PATCH mark as sold property', () => {
    before("should successfully post a property advert", (done) => {
        chai.request(app)
            .post('/api/v1/property')
            .send({
                price: 70000000,
                state: "Karen",
                city: "Nairobi",
                address: "Kenya",
                type: "villa",
                image_url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?cs=srgb&dl=architecture-beautiful-exterior-106399.jpg&fm=jpg"
            })
            .end((err, res) => {
                id = res.body.data.id;
                if (err) return done();
                done();
            });
    });

    it("should successfully mark a property advert", (done) => {
        chai.request(app)
            .patch(`/api/v1/property/${id}`)
            .end((err, res) => {
                res.should.have.status(200);
                if (err) return done();
                done();
            });
    });

    it("should not mark a property that does not exist", (done) => {
        chai.request(app)
            .patch('/api/v1/property/1')
            .end((err, res) => {
                res.should.have.status(404);
                expect(res.body.error).equals("No property found");
                if (err) return done();
                done();
            });
    });

});

describe('/DELETE property', () => {
    before("should successfully post a property advert", (done) => {
        chai.request(app)
            .post('/api/v1/property')
            .send({
                price: 70000000,
                state: 'Karen',
                city: 'Nairobi',
                address: 'Kenya',
                type: 'villa',
                image_url: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?cs=srgb&dl=architecture-beautiful-exterior-106399.jpg&fm=jpg'


            })
            .end((err, res) => {
                id = res.body.data.id;
                if (err) return done();
                done();
            });
    });
    it("should successfully delete a  property advert", (done) => {
        chai.request(app)
            .delete(`/api/v1/property/${id}`)
            .end((err, res) => {
                res.should.have.status(200);
                if (err) return done();
                done();
            });
    });

    it("should not delete a property advert if no id exists", (done) => {
        chai.request(app)
            .delete('/api/v1/property/1')
            .end((err, res) => {
                expect(res.body.error).equals("You have no advert with that Id");
                res.should.have.status(404);
                if (err) return done();
                done();
            });
    });
});
