/* eslint-disable no-undef */
/* eslint-disable quotes */

import chai from "chai";
import chaiHttp from "chai-http";
import app from "../server.js";
import Property  from "../models/propertyModel";

const { expect } = chai;
chai.should();
chai.use(chaiHttp);


describe('/GET specific property', () => {
    it('should return an error no advert of that id exists', (done) => {
        chai.request(app)
            .get('/api/v1/property/111')
            .end((err, res) => {
                res.should.have.status(404);
                expect(res.body.error).equals('property not found');
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
                expect(res.body.error).equals('No property adverts of that type found');
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
                expect(res.body.error).equals('No adverts found');
                res.should.have.status(404);
                if (err) return done();
                done();
            });
    });
});

