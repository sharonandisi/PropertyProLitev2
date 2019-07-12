/* eslint-disable quotes */
/* eslint-disable no-undef */

import chai from "chai";
import chaiHttp from "chai-http";
import app from "../server.js";

const { expect } = chai;
chai.should();
chai.use(chaiHttp);

describe('/DELETE property', () => {
    it("should successfully delete a  property advert", (done) => {
        chai.request(app)
            .delete('/api/v1/property/1')
            .end((err, res) => {
                res.should.have.status(200);
                if (err) return done();
                done();
            });
    });

    it("should not delete a property advert if no id exists", (done) => {
        chai.request(app)
            .delete('/api/v1/property/3')
            .end((err, res) => {
                expect(res.body.error).equals("You have no advert with that Id");
                res.should.have.status(404);
                if (err) return done();
                done();
            });
    });
});