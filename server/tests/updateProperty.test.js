/* eslint-disable no-undef */
/* eslint-disable quotes */

import chai from "chai";
import chaiHttp from "chai-http";
import app from "../server.js";

const { expect } = chai;
chai.should();
chai.use(chaiHttp);



describe('/PATCH property', () => {
    it("should not update advert with missing price", (done) => {
        chai.request(app)
            .patch('/api/v1/property/1')
            .send({
                price: "",
                state: "Karen",
                city: "Nairobi",
                address: "Kenya",
                type: "villa",
                image_url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?cs=srgb&dl=architecture-beautiful-exterior-106399.jpg&fm=jpg",
            })
            .end((err, res) => {
                res.should.have.status(400);
                expect(res.body.error).equals("Price is a required field ");
                if (err) return done();
                done();
            });
    });

    it("should not update advert with missing state", (done) => {
        chai.request(app)
            .patch('/api/v1/property/1')
            .send({
                price: "70000000",
                state: "",
                city: "Nairobi",
                address: "Kenya",
                type: "villa",
                image_url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?cs=srgb&dl=architecture-beautiful-exterior-106399.jpg&fm=jpg",
            })
            .end((err, res) => {
                res.should.have.status(400);
                expect(res.body.error).equals("State is a required field with a min of 3 chars and no special chars or numbers");
                if (err) return done();
                done();
            });
    });


    it("should not update advert with missing city", (done) => {
        chai.request(app)
            .patch('/api/v1/property/1')
            .send({
                price: "70000000",
                state: "Karen",
                city: "",
                address: "Kenya",
                type: "villa",
                image_url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?cs=srgb&dl=architecture-beautiful-exterior-106399.jpg&fm=jpg",
            })
            .end((err, res) => {
                res.should.have.status(400);
                expect(res.body.error).equals("City is a required field with a min of 3 chars and no special chars or numbers");
                if (err) return done();
                done();
            });
    });


    it("should not update advert with missing address", (done) => {
        chai.request(app)
            .patch('/api/v1/property/1')
            .send({
                price: "70000000",
                state: "Karen",
                city: "Nairobi",
                address: "",
                type: "villa",
                image_url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?cs=srgb&dl=architecture-beautiful-exterior-106399.jpg&fm=jpg",
            })
            .end((err, res) => {
                res.should.have.status(400);
                expect(res.body.error).equals("Address is a required field with a min of 3 chars and no special chars or numbers");
                if (err) return done();
                done();
            });
    });

    it("should not update advert with missing type", (done) => {
        chai.request(app)
            .patch('/api/v1/property/1')
            .send({
                price: "70000000",
                state: "Karen",
                city: "Nairobi",
                address: "Kenya",
                type: "",
                image_url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?cs=srgb&dl=architecture-beautiful-exterior-106399.jpg&fm=jpg",
            })
            .end((err, res) => {
                res.should.have.status(400);
                expect(res.body.error).equals("Type is a required field with a min of 3 chars and no special chars or numbers");
                if (err) return done();
                done();
            });
    });


    it("should not update advert with missing image_url", (done) => {
        chai.request(app)
            .patch('/api/v1/property/1')
            .send({
                price: "70000000",
                state: "",
                city: "Nairobi",
                address: "Kenya",
                type: "villa",
                image_url: "",
            })
            .end((err, res) => {
                res.should.have.status(400);
                expect(res.body.error).equals("image_url is required");
                if (err) return done();
                done();
            });
    });


});