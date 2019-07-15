/* eslint-disable no-undef */

import chai from "chai";
import chaiHttp from "chai-http";
import app from "../server.js";

let id;
const { expect } = chai;
chai.should();
chai.use(chaiHttp);


describe('/PATCH update-property', () => {
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
