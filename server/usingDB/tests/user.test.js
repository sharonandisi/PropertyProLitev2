import chai , { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';




chai.should();
chai.use(chaiHttp);



describe('User', () => {

    before('Create tables', (done) => {
        createUserTable();
        done();
    });
    
    describe('POST /', () => {
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
                    expect(res.body.error).equals("Email is a required field and must be valid");
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
                    expect(res.body.error).equals("Firstname is required with a min of 3 chars and no special chars or numbers");
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
                    expect(res.body.error).equals("Lastname required  with a min of 3 chars and no special chars or numbers");
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
                    expect(res.body.error).equals("Password required with a min of 5 chars and no special chars");
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
                    expect(res.body.error).equals("phoneNumber required with a min of 10 numbers with no special chars or letters");
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
                    expect(res.body.error).equals("Address required with a min of 4 chars and no special chars");
                    if (err) return done();
                    done();
                });
        });

        it("should not sign up an already registered user", (done) => {
            chai.request(app)
                .send({
                    email: 'andisi@gmail.com',
                    first_name: 'sharon',
                    last_name: 'andisi',
                    password: 'wer123456',
                    phoneNumber: '0702317926',
                    address: 'iowra'

                })
                .end((err, res) => {
                    res.should.have.status(400);
                    expect(res.body.error).equals("Email already in use");
                    if (err) return done()
                })
        })

        it("should not sign up a user missing all fields", (done) => {
            chai.request(app)
            .send({
                email: "",
                first_name: "",
                last_name: "",
                password: "",
                phoneNumber: "",
                address: ""
            })
            .end((err, res) => {
                res.should.have.status(400);
                expect(res.body.error).equals("All fields are required");
                if (err) return done()
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
                    res.body.message.should.equals("Successfully logged in")
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
                    expect(res.body.error).equals("Email is a required field and must be valid");
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
                expect(res.body.error).equals("credentials you provided is incorrect");
                if (err) return done();
            });
        })


    });
   
})