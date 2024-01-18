/** @format */

const { app } = require("../index");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { describe } = require("mocha");
const should = chai.should();
chai.use(chaiHttp);

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWE3ODI1YTk1ZDhiNzZlZTQ5NzI0MWYiLCJuYW1lIjoiQWNjb3VudCBPbmUiLCJ1c2VybmFtZSI6ImFjY291bnRfb25lIiwiZW1haWwiOiJhY2NvdW50X29uZUB0ZXN0LmNvbSIsImlhdCI6MTcwNTQ3NzE2OSwiZXhwIjoxNzA4MDY5MTY5fQ.QQWrzieyFeeAiHJ7kN3dg-MGHsJue0dwUbIT7yZuAx8";

describe("Test URL apis", () => {
  describe("/create", () => {
    it("should create a short url", (done) => {
      const data = {
        link: "https://www.geeksforgeeks.org/array-data-structure/",
      };

      chai
        .request(app)
        .post("/api/link/create")
        .set("x-access-token", token)
        .send(data)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("data");
          res.body.data.should.have.property("_id");
          res.body.data.should.have.property("original_url");
          res.body.data.should.have.property("short_url");
          res.body.data.should.have.property("user");
          done();
        });
    });
  });

  describe("/get", () => {
    it("should return all user's urls", (done) => {
      chai
        .request(app)
        .get("/api/link")
        .set("x-access-token", token)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
