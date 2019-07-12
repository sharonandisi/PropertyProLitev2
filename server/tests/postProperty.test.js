/* eslint-disable no-undef */
/* eslint-disable quotes */

import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';

const { expect } = chai;
chai.should();
chai.use(chaiHttp);

let imageTest = "./server/tests/test-assets/imageTest.jpeg";

describe('/POST property', () => {
    it('should successfully post a property advert', (done) => {
        chai.request(app)
            .post('/api/v1/property')
            .send({
                status: 'Available',
                price: 70000000,
                state: 'Karen',
                city: 'Nairobi',
                address: 'Kenya',
                type: 'villa'
            })
            .end((err, res) => {
                res.should.have.status(201);
                if (err) return done();
                done();
            });
    });


    it("should not  post a property advert with missing status", (done) => {
        chai.request(app)
            .post('/api/v1/property')
            .send({
                status: "",
                price: 70000000,
                state: "Karen",
                city: "Nairobi",
                address: "Kenya",
                type: "villa",
                image_url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?cs=srgb&dl=architecture-beautiful-exterior-106399.jpg&fm=jpg",
            })
            .end((err, res) => {
                res.should.have.status(400);
                expect(res.body.error).equals("Status is a required field with a min of 3 chars and no special chars or numbers");
                if (err) return done();
                done();
            });
    });



    it("should not  post a property advert with missing state", (done) => {
        chai.request(app)
            .post('/api/v1/property')
            .send({
                status: "Available",
                price: 70000000,
                state: "",
                city: "Nairobi",
                address: "Kenya",
                type: "villa",
                image_url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?cs=srgb&dl=architecture-beautiful-exterior-106399.jpg&fm=jpg",
            })
            .end((err, res) => {
                res.should.have.status(400);
                expect(res.body.error).equals("state is a required field with a min of 3 chars and no special chars or numbers");
                if (err) return done();
                done();
            });
    });


    it("should not  post a property advert with missing city", (done) => {
        chai.request(app)
            .post('/api/v1/property')
            .send({
                status: "Available",
                price: 70000000,
                state: "Karen",
                city: "",
                address: "Kenya",
                type: "villa",
                image_url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?cs=srgb&dl=architecture-beautiful-exterior-106399.jpg&fm=jpg",
            })
            .end((err, res) => {
                res.should.have.status(400);
                expect(res.body.error).equals("city is a required field with a min of 3 chars and no special chars or numbers");
                if (err) return done();
                done();
            });
    });



    it("should not  post a property advert with missing address", (done) => {
        chai.request(app)
            .post('/api/v1/property')
            .send({
                status: "Available",
                price: 70000000,
                state: "Karen",
                city: "Nairobi",
                address: "",
                type: "villa",
                image_url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?cs=srgb&dl=architecture-beautiful-exterior-106399.jpg&fm=jpg",
            })
            .end((err, res) => {
                res.should.have.status(400);
                expect(res.body.error).equals("address is a required field with a min of 3 chars and no special chars or numbers");
                if (err) return done();
                done();
            });
    });


    it("should not  post a property advert with missing type", (done) => {
        chai.request(app)
            .post('/api/v1/property')
            .send({
                status: "Available",
                price: 70000000,
                state: "Karen",
                city: "Nairobi",
                address: "Kenya",
                type: "",
                image_url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?cs=srgb&dl=architecture-beautiful-exterior-106399.jpg&fm=jpg",
            })
            .end((err, res) => {
                res.should.have.status(400);
                expect(res.body.error).equals("type is a required field with a min of 3 chars and no special chars or numbers");
                if (err) return done();
                done();
            });
    });



    it("should not  post a property advert with missing image_url", (done) => {
        chai.request(app)
            .post('/api/v1/property')
            .send({
                status: "Available",
                price: 70000000,
                state: "Karen",
                city: "",
                address: "Kenya",
                type: "villa",
                image_url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?cs=srgb&dl=architecture-beautiful-exterior-106399.jpg&fm=jpg",
            })
            .end((err, res) => {
                res.should.have.status(400);
                expect(res.body.error).equals("image_url is required");
                if (err) return done();
                done();
            });
    });

});