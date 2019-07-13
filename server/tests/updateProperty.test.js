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
                price: ""
            })
            .end((err, res) => {
                res.should.have.status(404);
                expect(res.body.error).equals("Price is a required field ");
                if (err) return done();
                done();
            });
    });
});