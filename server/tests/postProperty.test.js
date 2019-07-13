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
                price: 70000000,
                state: 'Karen',
                city: 'Nairobi',
                address: 'Kenya',
                type: 'villa',
                owneremail: "andisi@gmail.com",
            })
            .end((err, res) => {
                res.should.have.status(201);
                if (err) return done();
                done();
            });
    });


    it("should not  post a property advert with missing state", (done) => {
        chai.request(app)
            .post('/api/v1/property')
            .send({

                price: 70000000,
                state: "",
                city: "Nairobi",
                address: "Kenya",
                type: "villa",
                owneremail: "andisi@gmail.com",
            })
            .end((err, res) => {
                res.should.have.status(400);
                expect(res.body.error).equals("state required  with a min of 3 chars and no special chars or numbers");
                if (err) return done();
                done();
            });
    });


    it("should not  post a property advert with missing city", (done) => {
        chai.request(app)
            .post('/api/v1/property')
            .send({

                price: 70000000,
                state: "Karen",
                city: "",
                address: "Kenya",
                type: "villa",
                owneremail: "andisi@gmail.com",
            })
            .end((err, res) => {
                res.should.have.status(400);
                expect(res.body.error).equals("city required with a min of 4 chars and no special chars");
                if (err) return done();
                done();
            });
    });



    it("should not  post a property advert with missing address", (done) => {
        chai.request(app)
            .post('/api/v1/property')
            .send({

                price: 70000000,
                state: "Karen",
                city: "Nairobi",
                address: "",
                type: "villa",
                owneremail: "andisi@gmai.com",
            })
            .end((err, res) => {
                res.should.have.status(400);
                expect(res.body.error).equals("address is required with a min of 3 chars and no special chars or numbers");
                if (err) return done();
                done();
            });
    });


    it("should not  post a property advert with missing type", (done) => {
        chai.request(app)
            .post('/api/v1/property')
            .send({

                price: 70000000,
                state: "Karen",
                city: "Nairobi",
                address: "Kenya",
                type: "",
                owneremail: "andisi@gmail.com"
            })
            .end((err, res) => {
                res.should.have.status(400);
                expect(res.body.error).equals("type required with a min of 3 char with no special chars or letters");
                if (err) return done();
                done();
            });
    });


    it("should not  post a property advert with missing email", (done) => {
        chai.request(app)
            .post('/api/v1/property')
            .send({

                price: 70000000,
                state: "Karen",
                city: "Nairobi",
                address: "Kenya",
                type: "villa",
                owneremail: ""
            })
            .end((err, res) => {
                res.should.have.status(400);
                expect(res.body.error).equals("Email required field and must be valid");
                if (err) return done();
                done();
            });
    });

});