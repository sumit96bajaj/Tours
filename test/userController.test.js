const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const faker = require("faker");
const userController = require("./../controller/usercontroller");

const User = require("../models/userModels");

describe("Usercontroller", function () {
    describe("getAllUsers", function () {
        let req;
        let res;
        let next;
        // afterEach(function () {
        //     User.find.restore();
        // });
        // it("Spy the User.find method", function () {
        //     var spy = sinon.spy(User, "find");
        //     tourController.getAllUsers();
        //     expect(spy.calledOnce).to.be.true;
        // });
        it("Mock the User.find method", function () {
            var mock = sinon.mock(User);
            var expectation = mock.expects("find");
            expectation.exactly(1);
            userController.getAllUsers();
            mock.verify();
        });
    });
    describe("Delete a user", function () {
        beforeEach(() => {
            req = {
                params: {
                    id: "5c8a1dfa2f8fb814b56fa181",
                }
            };
            status = sinon.stub();
            json = sinon.spy();
            res = { json, status };
            status.returns(res);
        });
        it("It should delete a user", async function () {
            const stubData = {
                "doc": {
                    "role": "user",
                    "active": true,
                    "_id": "5c8a1dfa2f8fb814b56fa181",
                    "name": "Lourdes Browning",
                    "email": "loulou@example.com",
                    "photo": "user-2.jpg",
                    "password": "$2a$12$hP1h2pnNp7wgyZNRwPsOTeZuNzWBv7vHmsR3DT/OaPSUBQT.y0S..",
                    "__v": 0
                }
            };
            var stub = sinon.stub(User, "findByIdAndDelete").resolves(stubData);
            await userController.deleteUser(req, res);
            expect(json.args[0][0].data).to.equal(stubData);
            expect(stub.calledOnce).to.be.true;
            expect(status.calledOnce).to.be.true;
            expect(status.args[0][0]).to.equal(200);
            expect(json.calledOnce).to.be.true;
        })
    })
    describe("getUser", function () {
        beforeEach(() => {
            req = {
                params: {
                    id: "5c8a1f292f8fb814b56fa184",
                }
            };
            status = sinon.stub();
            json = sinon.spy();
            res = { json, status };
            status.returns(res);
        });
        it("Stub the User.findById method", async function () {
            var stubData = {
                "doc": {
                    "role": "guide",
                    "_id": "5c8a1f292f8fb814b56fa184",
                    "name": "Leo Gillespie",
                    "email": "leo@example.com",
                    "photo": "user-5.jpg",
                    "__v": 0
                }
            };
            var stub = sinon.stub(User, "findById").resolves(stubData);
            await userController.getUser(req, res);
            expect(json.args[0][0].data).to.equal(stubData);
            expect(stub.calledOnce).to.be.true;
            expect(status.calledOnce).to.be.true;
            expect(status.args[0][0]).to.equal(200);
            expect(json.calledOnce).to.be.true;
        });
    });
    describe("updateUser", function () {
        beforeEach(() => {
            req = {
                params: {
                    id: "5c8a1f292f8fb814b56fa184",
                }
            };
            status = sinon.stub();
            json = sinon.spy();
            res = { json, status };
            status.returns(res);
        });
        after(function () {
            User.findByIdAndUpdate.restore();
        });
        it("Stub the User.findByIdAndUpdate method", async function () {
            var stubData = {
                "doc": {
                    "role": "guide",
                    "_id": "5c8a1f292f8fb814b56fa184",
                    "name": "Leo Gillespie",
                    "email": "leo@example.com",
                    "photo": "user-5.jpg",
                    "__v": 0
                }
            };
            var stub = sinon.stub(User, "findByIdAndUpdate").resolves(stubData);
            await userController.updateUser(req, res);
            expect(json.args[0][0].data).to.equal(stubData);
            expect(stub.calledOnce).to.be.true;
            expect(status.calledOnce).to.be.true;
            expect(status.args[0][0]).to.equal(200);
            expect(json.calledOnce).to.be.true;
        });
    });
    describe("User deletion", function () {
        beforeEach(() => {
            req = {
                user: {
                    "name": "Elina",
                    "email": "elina@example.com"
                }
            };
            status = sinon.stub();
            json = sinon.spy();
            res = { json, status };
            status.returns(res);
        });
        after(function () {
            User.findByIdAndUpdate.restore();
        });
        it("It should delete a user signed-in", async function () {
            const stubData = null;
            var stub = sinon.stub(User, "findByIdAndUpdate").resolves(stubData);
            await userController.deleteMe(req, res);
            expect(json.args[0][0].data).to.equal(stubData);
            expect(stub.calledOnce).to.be.true;
            expect(status.calledOnce).to.be.true;
            expect(status.args[0][0]).to.equal(204);
            expect(json.calledOnce).to.be.true;
        })
    })
    // describe("updateUser Signed-In", function () {
    //     beforeEach(() => {
    //         req = {
    //             body: {
    //                 "name": "Elina",
    //                 "email": "elina@example.com"
    //             }
    //         };
    //         status = sinon.stub();
    //         json = sinon.spy();
    //         res = { json, status };
    //         status.returns(res);
    //     });
    //     after(function () {
    //         User.findByIdAndUpdate.restore();
    //     });
    //     it("Stub the User.findByIdAndUpdate method", async function () {
    //         var stubData = {
    //             "user": {
    //                 "role": "user",
    //                 "_id": "5c8a20d32f8fb814b56fa187",
    //                 "name": "Elina",
    //                 "email": "elina@example.com",
    //                 "photo": "user-8.jpg",
    //                 "__v": 0
    //             }
    //         };
    //         var stub = sinon.stub(User, "findByIdAndUpdate").resolves(stubData);
    //         await userController.updateMe(req, res);
    //         expect(json.args[0][0].data).to.equal(stubData);
    //         expect(stub.calledOnce).to.be.true;
    //         expect(status.calledOnce).to.be.true;
    //         expect(status.args[0][0]).to.equal(200);
    //         expect(json.calledOnce).to.be.true;
    //     });
    // });
})