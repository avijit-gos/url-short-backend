/** @format */

const { app } = require("../index");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { describe } = require("mocha");
const should = chai.should();
chai.use(chaiHttp);

describe("Test User API", () => {
  describe("/api/user/register", () => {
    it("should register user", (done) => {
      const data = {
        name: "Account Six",
        username: "account_six",
        email: "account_six@test.com",
        password: "123",
      };
      chai
        .request(app)
        .post("/api/user/register")
        .send(data)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.user.should.have.property("_id");
          res.body.user.should.have.property("name");
          res.body.user.should.have.property("username");
          res.body.user.should.have.property("email");
          res.body.user.should.have.property("password");
          res.body.should.have.property("token");
          done();
        });
    });
  });

  describe("/api/user/login", () => {
    it("should login user", (done) => {
      const data = {
        username: "account_four",
        password: "123",
      };
      chai
        .request(app)
        .post("/api/user/login")
        .send(data)
        .end((err, res) => {
          // console.log(res.body.token);
          res.should.have.status(200);
          res.body.should.have.property("user");
          res.body.should.have.property("token");
          res.body.user.should.have.property("_id");
          res.body.user.should.have.property("name");
          res.body.user.should.have.property("email");
          res.body.user.should.have.property("username");
          res.body.user.should.have.property("password");
          done();
        });
    });
  });
});
