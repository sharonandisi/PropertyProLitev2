import chai from 'chai';
import chaiHttp from 'chai-Http';
import app from '../server.js';



const { expect } = chai;
chai.should();
chai.use(chaiHttp);

describe('/Auth', () => {
    describe('/POST signup', () => {
        it("should successfully sign up user", (done) => {
            chai.request(app)
                .post('/api/v1/auth/signup')
                .send({
                    email: "shay@gmail.com",
                    firstname: "sharon",
                    lastname: "andy",
                    password: "shay123",
                    phoneNumber: "0712345678",
                    address: "Kenya",
                    is_Agent: false,
                })
                .end((err, res) => {
                    res.should.have.status(201);
                    if (err) return done();
                    done(); 
                });

        });

        it ("should not sign up a user missing an email", (done) => {
        chai.request(app)
            .post('/api/v1/auth/signup')
            .send({
                email: " ",
                firstname: "sharon",
                lastname: "andy",
                password: "shay123",
                phoneNumber: "0712345678",
                address: "Kenya",
                is_Agent: false,

            })
            .end((err, res) => {
                res.should.have.status(400);
                expect(res.body.data).equals("Your email is required")
                if (err) return done();
                done(); 
            });
        });

        it("should not sign up a user missing the firstname", (done) => {
            chai.request(app)
                .post('/api/v1/auth/signup')
                .send({
                    email: "shay@gmail.com",
                    firstname: " ",
                    lastname: "andy",
                    password: "shay123",
                    phoneNumber: "0712345678",
                    address: "Kenya",
                    is_Agent: false,

                })
                .end((err, res) => {
                    res.should.have.status(400);
                    expect(res.body.data).equals("Your firstname is required with a min of 3 chars and no special chars or numbers")
                    if (err) return done();
                    done();
                });
        });

        it("should not sign up a user missing the lastname", (done) => {
            chai.request(app)
                .post('/api/v1/auth/signup')
                .send({
                    email: "shay@gmail.com",
                    firstname: "sharon",
                    lastname: " ",
                    password: "shay123",
                    phoneNumber: "0712345678",
                    address: "Kenya",
                    is_Agent: false,

                })
                .end((err, res) => {
                    res.should.have.status(400);
                    expect(res.body.data).equals("Your lastname is required with a min of 3 chars and no special chars or numbers")
                    if (err) return done();
                    done();
                });
        });


        it("should not sign up a user missing a password", (done) => {
            chai.request(app)
                .post('/api/v1/auth/signup')
                .send({
                    email: "shay@gmail.com",
                    firstname: "sharon",
                    lastname: "andy",
                    password: " ",
                    phoneNumber: "0712345678",
                    address: "Kenya",
                    is_Agent: false,

                })
                .end((err, res) => {
                    res.should.have.status(400);
                    expect(res.body.data).equals("Your password is required with a min of 6 chars and with no special chars")
                    if (err) return done();
                    done();
                });
        });


        it("should not sign up a user missing the phoneNumber", (done) => {
            chai.request(app)
                .post('/api/v1/auth/signup')
                .send({
                    email: "shay@gmail.com",
                    firstname: "sharon",
                    lastname: "andy",
                    password: "shay123",
                    phoneNumber: " ",
                    address: "Kenya",
                    is_Agent: false,

                })
                .end((err, res) => {
                    res.should.have.status(400);
                    expect(res.body.data).equals("Your phonenumber is required with a min of 10 numbers and no special chars or letters")
                    if (err) return done();
                    done();
                });
        });


        it("should not sign up a user missing the address", (done) => {
            chai.request(app)
                .post('/api/v1/auth/signup')
                .send({
                    email: "shay@gmail.com",
                    firstname: "sharon",
                    lastname: "andy",
                    password: "shay123",
                    phoneNumber: "0712345678",
                    address: " ",
                    is_Agent: false,

                })
                .end((err, res) => {
                    res.should.have.status(400);
                    expect(res.body.data).equals("Your address is required with a min of 4 chars and no special chars or numbers")
                    if (err) return done();
                    done();
                });
        });


        it("should not sign up a user missing the is_Agent", (done) => {
            chai.request(app)
                .post('/api/v1/auth/signup')
                .send({
                    email: "shay@gmail.com",
                    firstname: "sharon",
                    lastname: "andy",
                    password: "shay123",
                    phoneNumber: "0712345678",
                    address: "Kenya",
                    is_Agent: "",

                })
                .end((err, res) => {
                    res.should.have.status(400);
                    expect(res.body.data).equals("Your is_Agent field is required as either True or False ")
                    if (err) return done();
                    done();
                });
        });


        it("should check if the email has been used to register before", (done) => {
            chai.request(app)
                .post('/api/v1/auth/signup')
                .send({
                    email: "shay@gmail.com",
                    firstname: "sharon",
                    lastname: "andy",
                    password: "shay123",
                    phoneNumber: "0712345678",
                    address: "Kenya",
                    is_Agent: false,

                })
                .end((err, res) => {
                    res.should.have.status(409);
                    expect(res.body.data).equals("Your email is already in use")
                    if (err) return done();
                    done();
                });
        });


        it("should check if the email is valid", (done) => {
            chai.request(app)
                .post('/api/v1/auth/signup')
                .send({
                    email: "shay@gmail.com",
                    firstname: "sharon",
                    lastname: "andy",
                    password: "shay123",
                    phoneNumber: "0712345678",
                    address: "Kenya",
                    is_Agent: false,

                })
                .end((err, res) => {
                    res.should.have.status(400);
                    expect(res.body.data).equals("Your email is a required field and must be a valid email")
                    if (err) return done();
                    done();
                });
        });


        it("should check if the firstname is valid", (done) => {
            chai.request(app)
                .post('/api/v1/auth/signup')
                .send({
                    email: "shay@gmail.com",
                    firstname: "sharon",
                    lastname: "andy",
                    password: "shay123",
                    phoneNumber: "0712345678",
                    address: "Kenya",
                    is_Agent: false,

                })
                .end((err, res) => {
                    res.should.have.status(400);
                    expect(res.body.data).equals("Your firstname is a required field with a min of 3 chars with no special chars or numbers")
                    if (err) return done();
                    done();
                });
        });


        it("should check if the lastname is valid", (done) => {
            chai.request(app)
                .post('/api/v1/auth/signup')
                .send({
                    email: "shay@gmail.com",
                    firstname: "sharon",
                    lastname: "andy",
                    password: "shay123",
                    phoneNumber: "0712345678",
                    address: "Kenya",
                    is_Agent: false,

                })
                .end((err, res) => {
                    res.should.have.status(400);
                    expect(res.body.data).equals("Your lastname is a required field with a min of 3 chars with no special chars or numbers")
                    if (err) return done();
                    done();
                });
        });


        it("should check if the password is valid", (done) => {
            chai.request(app)
                .post('/api/v1/auth/signup')
                .send({
                    email: "shay@gmail.com",
                    firstname: "sharon",
                    lastname: "andy",
                    password: "shay123",
                    phoneNumber: "0712345678",
                    address: "Kenya",
                    is_Agent: false,

                })
                .end((err, res) => {
                    res.should.have.status(400);
                    expect(res.body.data).equals("Your password is a required field with a min of 6 chars and no special chars")
                    if (err) return done();
                    done();
                });
        });


        it("should check if the phoneNumber is valid", (done) => {
            chai.request(app)
                .post('/api/v1/auth/signup')
                .send({
                    email: "shay@gmail.com",
                    firstname: "sharon",
                    lastname: "andy",
                    password: "shay123",
                    phoneNumber: "0712345678",
                    address: "Kenya",
                    is_Agent: false,

                })
                .end((err, res) => {
                    res.should.have.status(400);
                    expect(res.body.data).equals("Your firstname is a required field with a min of 10 numbers with no special chars or letters")
                    if (err) return done();
                    done();
                });
        });

        it("should check if the address is valid", (done) => {
            chai.request(app)
                .post('/api/v1/auth/signup')
                .send({
                    email: "shay@gmail.com",
                    firstname: "sharon",
                    lastname: "andy",
                    password: "shay123",
                    phoneNumber: "0712345678",
                    address: "Kenya",
                    is_Agent: false,

                })
                .end((err, res) => {
                    res.should.have.status(400);
                    expect(res.body.data).equals("Your address is a required field with a min of 4 chars with no special chars or numbers")
                    if (err) return done();
                    done();
                });
        });


        it("should check if the is_Agent is valid", (done) => {
            chai.request(app)
                .post('/api/v1/auth/signup')
                .send({
                    email: "shay@gmail.com",
                    firstname: "sharon",
                    lastname: "andy",
                    password: "shay123",
                    phoneNumber: "0712345678",
                    address: "Kenya",
                    is_Agent: false,

                })
                .end((err, res) => {
                    res.should.have.status(400);
                    expect(res.body.data).equals("Your is_Agent field is a required field and can either be true or false")
                    if (err) return done();
                    done();
                });
        });
    });
});
