import chai from "chai";
import chaiHttp from "chai-http";
import app from "../server.js";


const { expect } = chai;
chai.should();
chai.use(chaiHttp);


describe('/PATCH mark as sold', () => {
    it("should return an error of this property is not available", (done) => {
        chai.request(app)
            .get('/api/v1/property/13/sold')
            .end((err, res) => {
                res.should.have.status(404);
                expect(res.body.error).equals("property not found");
                if (err) return done();
                done();
            });
    });


});