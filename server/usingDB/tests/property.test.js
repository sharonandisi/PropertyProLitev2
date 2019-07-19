import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';


const { expect } = chai;
chai.should();
chai.use(chaiHttp);



describe('/POST property', () => {
    it('should successfully post a property advert', (done) => {
        chai.request(app)
            .post('/api/v1/property')

            .attach('image_url', testImage)
            .field({
                status: 'Available',
                price: 5000000,
                state: 'Nairobi',
                city: 'Nairobi',
                address: 'Kenya',
                type: '2 bedroom'
            })
            .end((err, res) => {
                res.should.have.status(201);
                if (err) return done();
                done();
            });
    });

})