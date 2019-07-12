import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';
import userModel from '../models/userModel';


const users = userModel.users

const { expect } = chai;
chai.should();
chai.use(chaiHttp);

describe('/Auth', () => {
    describe('/POST signup', () => {
        // after(()=>{
        //     users.length = 0
        // })
        it ("should successfully sign up user", (done) => {
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
                "email": " ",
                "firstname": "sharon",
                "lastname": "andisi",
                "password": "shay123",
                "phoneNumber": "0712345678",
                "address": "iowra",
                "is_Agent": "false"
            })
            .end((err, res) => {
                res.should.have.status(400);
                expect(res.body.error).equals("Email required field and must be valid")
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
                    expect(res.body.error).equals("Firstname is required with a min of 3 chars and no special chars or numbers")
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
                    expect(res.body.error).equals("Lastname required  with a min of 3 chars and no special chars or numbers")
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
                    expect(res.body.error).equals("Password required with a min of 5 chars and no special chars")
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
                    expect(res.body.error).equals("phoneNumber required with a min of 10 numbers with no special chars or letters")
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
                    expect(res.body.error).equals("Address required with a min of 4 chars and no special chars")
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
                    expect(res.body.error).equals("is_Agent required .Can either be true or false")
                    if (err) return done();
                    done();
                });
        });


        it("should check if the email has been used to register before", (done) => {
            users.push({
                email: "shay@gmail.com",
                firstname: "sharon",
                lastname: "andy",
                password: "shay123",
                phoneNumber: "0712345678",
                address: "Kenya",
                is_Agent: false,
            })
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
                    expect(res.body.error).equals("Email already in use")
                    if (err) return done();
                    done();
                });
        });


       
        
    });
});
