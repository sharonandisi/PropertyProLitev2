import chai , { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';




chai.should();
chai.use(chaiHttp);



describe('User', () => { 
    describe('/POST signup', () => {
        const user = {
            email: 'andisi@gmail.com',
            first_name: 'sharon',
            last_name: 'andisi',
            password: 'wer123456',
            phoneNumber: '0702317926',
            address: 'iowra'
        };
        it('should successfully register a user', (done) =>{
            chai.request(app)
            .post('/api/v1/auth/signup')
            .send(user)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.message.should.equals("Successfully signed up");
                if (err) return done();
                done();
            });
        });

        it("should not sign up a user missing an email", (done) => {
            chai.request(app)
                .post('/api/v1/auth/signup')
                .send({
                    "email": " ",
                    "first_name": "sharon",
                    "last_name": "andisi",
                    "password": "wer123456",
                    "phoneNumber": "0702317926",
                    "address": "iowra"
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    if (err) return done();
                    done();
                });
        });

        it("should not sign up a user missing a first_name", (done) => {
            chai.request(app)
                .post('/api/v1/auth/signup')
                .send({
                    "email": "andisi@gmail.com",
                    "first_name": " ",
                    "last_name": "andisi",
                    "password": "wer123456",
                    "phoneNumber": "0702317926",
                    "address": "iowra"
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    if (err) return done();
                    done();
                });
        });

        it("should not sign up a user missing a last_name", (done) => {
            chai.request(app)
                .post('/api/v1/auth/signup')
                .send({
                    "email": "andisi@gmail.com",
                    "first_name": "sharon",
                    "last_name": " ",
                    "password": "wer123456",
                    "phoneNumber": "0702317926",
                    "address": "iowra",
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    if (err) return done();
                    done();
                });
        });

        it("should not sign up a user missing a password", (done) => {
            chai.request(app)
                .post('/api/v1/auth/signup')
                .send({
                    "email": "andisi@gmail.com",
                    "first_name": "sharon",
                    "last_name": "andisi",
                    "password": " ",
                    "phoneNumber": "0702317926",
                    "address": "iowra"
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    if (err) return done();
                    done();
                });
        });

        it("should not sign up a user missing a phoneNumber", (done) => {
            chai.request(app)
                .post('/api/v1/auth/signup')
                .send({
                    "email": "andisi@gmail.com",
                    "first_name": "sharon",
                    "last_name": "andisi",
                    "password": "wer123456",
                    "phoneNumber": " ",
                    "address": "iowra"
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    if (err) return done();
                    done();
                });
        });


        it("should not sign up a user missing a address", (done) => {
            chai.request(app)
                .post('/api/v1/auth/signup')
                .send({
                    "email": "andisi@gmail.com",
                    "first_name": "sharon",
                    "last_name": "andisi",
                    "password": "wer123456",
                    "phoneNumber": "0702317926",
                    "address": " "
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    if (err) return done();
                    done();
                });
        });

        it("should not sign up an already registered user", (done) => {
            chai.request(app)
                .post('/api/v1/auth/signup')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                    if (err) return done();
                })
        })

    })


    describe ('/POST signin', () => {

        it("should successfully sign up a user", (done) => {
            chai.request(app)
                .post('/api/v1/auth/signin')
                .send({
                    email: "andisi@gmail.com",
                    password: "wer123456",
                })
                .end((err, res) => {
                    res.should.have.status(201);
                    if (err) return done();
                    done();
                });

        });

        it("should not sign in a user missing the email", (done) => {
            chai.request(app)
                .post('/api/v1/auth/signin')
                .send({
                    email: "",
                    password: "wer1234568",
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    if (err) return done();
                    done();

                });

        });

        it("should not sign in a user missing a password", (done) => {
            chai.request(app)
            .post('/api/v1/auth/signin')
            .send({
                email: "andisi@gmail.com",
                password: ""
            })
            .end((err, res) => {
                res.should.have.status(400);
                expect(res.body.error).equals("Some values are missing");
                if (err) return done();
                done();
            });
        })


    });
   
})