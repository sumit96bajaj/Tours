const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const faker = require("faker");
const authController = require("./../controller/authController");
const User = require("./../models/userModels");
const jwt = require('jsonwebtoken');
const proxyquire = require('proxyquire');

describe("Test auth functions", function () {
    describe("Test signup function", function () {
        let req;
        let res;
        beforeEach(() => {
            req = {
                body: {
                    name: "user",
                    email: "sumitbajaj@gmail.com",
                    password: "test1234",
                    passwordConfirm: "test1234"
                }
            }
        });
        // after(function () {
        //     authController.createSendToken.restore();
        // });
        it("It should test signup", async function () {
            const stubData = {
                status: "success",
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWJhMDg1ODA1ZWRkNWEzODI2Nzc5OSIsImlhdCI6MTYyNjA1NDc5MSwiZXhwIjoxNjMzODMwNzkxfQ.0eqk76fIMohXnqW4sNWVlulqF5m3WXMURSDCcTDChmY",
                data: {
                    user: {
                        role: "user",
                        active: true,
                        _id: "60eba085805edd5a38267799",
                        name: "user",
                        email: "sumitbajaj@gmail.com",
                        __v: 0
                    }
                }
            };
            const tokenData = {};
            var stubDB = sinon.stub(User, "create").resolves(stubData);
            // var stubToken = sinon.stub(authController, "createSendToken").returns("mockedreturn");
            const createToken = sinon.stub();
            const ModuleWithDependency = proxyquire('module', {
                'createSendToken': createToken
            })
            await authController.signup(req, res);
            expect(stubDB.calledOnce).to.be.true;
            // console.log(stubToken.callCount);
            expect(createToken.calledOnce).to.be.true;
        });
    });
    describe("Test signin function", function () {
        let req;
        let res;
        beforeEach(() => {
            req = {
                body: {
                    email: "sumitbajaj@gmail.com",
                    password: "test1234",
                }
            }
        });
        it("It should test signin", async function () {
            const stubData = {
                status: "success",
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWJhMDg1ODA1ZWRkNWEzODI2Nzc5OSIsImlhdCI6MTYyNjA1NDc5MSwiZXhwIjoxNjMzODMwNzkxfQ.0eqk76fIMohXnqW4sNWVlulqF5m3WXMURSDCcTDChmY",
                data: {
                    user: {
                        role: "user",
                        active: true,
                        _id: "60eba085805edd5a38267799",
                        name: "user",
                        email: "sumitbajaj@gmail.com",
                        __v: 0
                    }
                }
            };
            const tokenData = {};
            var stubDB = sinon.stub(User, "findOne").resolves(stubData);
            var stubToken = sinon.stub(authController, "createSendToken").returns(null);
            await authController.signin(req, res);
            expect(stubDB.calledOnce).to.be.true;
            expect(stubToken.calledOnce).to.be.true;
        });
    });
    // describe("Test protect function", function () {
    //     let req;
    //     let res;
    //     beforeEach(() => {
    //         req = {
    //             headers: {
    //                 authorization: "Bearer wergrfvwt3tg34g345ty36ety36by65yv5t36y35y36y",
    //             }
    //         }
    //     });
    //     it("It should test protect", async function () {
    //         const stubData = {
    //             data: {
    //                 user: {
    //                     role: "user",
    //                     active: true,
    //                     _id: "60eba085805edd5a38267799",
    //                     name: "user",
    //                     email: "sumitbajaj@gmail.com",
    //                     __v: 0
    //                 }
    //             }
    //         };
    //         var stubDB = sinon.stub(User, "findById").resolves(stubData);
    //         await authController.signin(req, res);
    //         expect(stubDB.calledOnce).to.be.true;
    //     });
    // })
});