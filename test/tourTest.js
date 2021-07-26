// let chai = require("chai");
// let chaiHttp = require("chai-http");
// let server = require("../server");

// const tokenAdmin = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjOGExZDViMDE5MGIyMTQzNjBkYzA1NyIsImlhdCI6MTYyNjMzNjk4OSwiZXhwIjoxNjM0MTEyOTg5fQ.Li6o4R_daFLhJuOuXml0U-JjLMI2Q5VtmJoTcZIF68w";
// let newTour;
// //Assertion Style
// chai.should();
// chai.use(chaiHttp);

// describe("Tours API", () => {

//     //Test Get All Tours

//     describe("GET /api/v1/tours", () => {
//         it("It should get all the tasks", (done) => {
//             chai.request(server)
//                 .get('/api/v1/tours')
//                 .end((err, response) => {
//                     response.should.have.status(200);
//                     response.body.data.should.be.a("array");
//                     done();
//                 });
//         });
//         it("It should not get all the tasks", (done) => {
//             chai.request(server)
//                 .get('/api/v1/tour')
//                 .end((err, response) => {
//                     response.should.have.status(500);
//                     done();
//                 });
//         });
//     });
//     describe("GET /api/v1/tours/:id", () => {
//         it("It should find a task by ID", (done) => {
//             const tourID = "5c88fa8cf4afda39709c2955";
//             chai.request(server)
//                 .get("/api/v1/tours/" + tourID)
//                 .end((err, response) => {
//                     response.should.have.status(200);
//                     response.body.data.should.be.a("object");
//                     response.body.data.should.have.property("name");
//                     response.body.data.should.have.property("ratingsQuantity");
//                     response.body.data.should.have.property("startLocation");
//                     response.body.data.should.have.property("ratingsAverage");
//                     response.body.data.should.have.property("images");
//                     response.body.data.should.have.property("startDates");
//                     response.body.data.should.have.property("guides");
//                     response.body.data.should.have.property("_id");
//                     response.body.data.should.have.property("duration");
//                     response.body.data.should.have.property("maxGroupSize");
//                     response.body.data.should.have.property("difficulty");
//                     response.body.data.should.have.property("price");
//                     response.body.data.should.have.property("summary");
//                     response.body.data.should.have.property("description");
//                     response.body.data.should.have.property("imageCover");
//                     response.body.data.should.have.property("reviews");
//                     done();
//                 });
//         });
//         it("It should not get the task by ID", (done) => {
//             const tourID = "5c88fa8cf4afda39709c295";
//             chai.request(server)
//                 .get('/api/v1/tours/' + tourID)
//                 .end((err, response) => {
//                     response.should.have.status(500);
//                     done();
//                 });
//         });
//     });
//     describe("GET /api/v1/tours/top-5-cheap", () => {
//         it("It should get top five cheap tours", (done) => {
//             chai.request(server)
//                 .get('/api/v1/tours/top-5-cheap')
//                 .end((err, response) => {
//                     response.should.have.status(200);
//                     response.body.data.should.be.a("array");
//                     response.body.data.length.should.be.eq(5);
//                     done();
//                 });
//         });
//         it("It should not get top five cheap tours", (done) => {
//             chai.request(server)
//                 .get('/api/v1/tour/top-5-cheap')
//                 .end((err, response) => {
//                     response.should.have.status(500);
//                     done();
//                 });
//         });
//     });
//     describe("GET /api/v1/tours/tour-stats", () => {
//         it("It should get tour stats on the basis of difficulty", (done) => {
//             chai.request(server)
//                 .get('/api/v1/tours/tour-stats')
//                 .end((err, response) => {
//                     response.should.have.status(200);
//                     response.body.data.should.be.a("object");
//                     response.body.data.stats.length.should.be.eq(3);
//                     done();
//                 });
//         });
//         it("It should get tour stats on the basis of difficulty", (done) => {
//             chai.request(server)
//                 .get('/api/v1/tour/tour-stats')
//                 .end((err, response) => {
//                     response.should.have.status(500);
//                     done();
//                 });
//         });
//     });
//     describe("GET /api/v1/tours/tours-within/:distance/center/:latlng/unit/:unit", () => {
//         it("It should get tour within a distance of particular latitude and longitude", (done) => {
//             const distance = 400;
//             const latlng = "34.1111745,-118.113491";
//             const unit = "mi";
//             chai.request(server)

//                 .get("/api/v1/tours/tours-within/" + distance + "/center/" + latlng + "/unit/" + unit)
//                 .end((err, response) => {
//                     response.should.have.status(200);
//                     response.body.data.should.be.a("array");
//                     // response.body.data.data.length.should.be.eq(3);
//                     done();
//                 });
//         });
//         it("It should not get tour within a distance of particular latitude and longitude", (done) => {
//             const distance = 400;
//             const latlng = "34.1111745,-118.113491";
//             const unit = "mi";
//             chai.request(server)
//                 .get("/api/v1/tour/tours-within/" + distance + "/center/" + latlng + "/unit/" + unit)
//                 .end((err, response) => {
//                     response.should.have.status(500);
//                     done();
//                 });
//         });
//     });
//     describe("GET api/v1/tours/distances/:latlng/unit/:unit", () => {
//         it("It should get tour distances from a point", (done) => {
//             const latlng = "34.1111745,-118.113491";
//             const unit = "mi";
//             chai.request(server)
//                 .get("/api/v1/tours/distances/" + latlng + "/unit/" + unit)
//                 .end((err, response) => {
//                     response.should.have.status(200);
//                     response.body.data.should.be.a("object");
//                     // response.body.data.data.length.should.be.eq(9);
//                     done();
//                 });
//         });
//         it("It should not get tour distances from a point", (done) => {
//             const latlng = "34.1111745,-118.113491";
//             const unit = "mi";
//             chai.request(server)
//                 .get("/api/v1/tour/distances/" + latlng + "/unit/" + unit)
//                 .end((err, response) => {
//                     response.should.have.status(500);
//                     done();
//                 });
//         });
//     });
//     describe("POST api/v1/tours", () => {
//         it("It should create a new tour", (done) => {
//             const tour = {
//                 "startLocation": {
//                     "description": "Miami, USA",
//                     "type": "Point",
//                     "coordinates": [-80.185942, 25.774772],
//                     "address": "301 Biscayne Blvd, Miami, FL 33132, USA"
//                 },
//                 "ratingsAverage": 4.8,
//                 "ratingsQuantity": 6,
//                 "images": ["tour-2-1.jpg", "tour-2-2.jpg", "tour-2-3.jpg"],
//                 "startDates": [
//                     "2021-06-19T09:00:00.000Z",
//                     "2021-07-20T09:00:00.000Z",
//                     "2021-08-18T09:00:00.000Z"
//                 ],
//                 "name": "Test tour 5",
//                 "duration": 7,
//                 "maxGroupSize": 15,
//                 "difficulty": "medium",
//                 "guides": ["5c8a22c62f8fb814b56fa18b", "5c8a1f4e2f8fb814b56fa185"],
//                 "price": 497,
//                 "summary": "Exploring the jaw-dropping US east coast by foot and by boat",
//                 "description": "Description of tour to be created.",
//                 "imageCover": "tour-2-cover.jpg",
//                 "locations": [
//                     {
//                         "_id": "5c88fa8cf4afda39709c2959",
//                         "description": "Lummus Park Beach",
//                         "type": "Point",
//                         "coordinates": [-80.128473, 25.781842],
//                         "day": 1
//                     },
//                     {
//                         "_id": "5c88fa8cf4afda39709c2958",
//                         "description": "Islamorada",
//                         "type": "Point",
//                         "coordinates": [-80.647885, 24.909047],
//                         "day": 2
//                     },
//                     {
//                         "_id": "5c88fa8cf4afda39709c2957",
//                         "description": "Sombrero Beach",
//                         "type": "Point",
//                         "coordinates": [-81.0784, 24.707496],
//                         "day": 3
//                     },
//                     {
//                         "_id": "5c88fa8cf4afda39709c2956",
//                         "description": "West Key",
//                         "type": "Point",
//                         "coordinates": [-81.768719, 24.552242],
//                         "day": 5
//                     }
//                 ]
//             };
//             chai.request(server)
//                 .post("/api/v1/tours")
//                 .send(tour)
//                 .set('Authorization', 'Bearer ' + tokenAdmin)
//                 .end((err, response) => {
//                     response.should.have.status(201);
//                     response.body.data.should.be.a("object");
//                     done();
//                 });
//         });
//         it("It should not create a new tour", (done) => {
//             chai.request(server)
//                 .get("/api/v1/tour")
//                 .end((err, response) => {
//                     response.should.have.status(500);
//                     done();
//                 });
//         });
//     });
//     describe("GET api/v1/tours/monthly-plan/2021", () => {
//         it("It should get all the month-wise plans", (done) => {
//             chai.request(server)
//                 .get('/api/v1/tours/monthly-plan/2021')
//                 .set('Authorization', 'Bearer ' + tokenAdmin)
//                 .end((err, response) => {
//                     response.should.have.status(200);
//                     response.body.should.be.a("array");
//                     done();
//                 });
//         });
//         it("It should not get all the month-wise plans", (done) => {
//             chai.request(server)
//                 .get('/api/v1/tour/monthly-plan/2021')
//                 .set('Authorization', 'Bearer ' + tokenAdmin)
//                 .end((err, response) => {
//                     response.should.have.status(500);
//                     done();
//                 });
//         });
//     });
//     describe("PATCH api/v1/tours/:id", () => {
//         it("It should update the tour data", (done) => {
//             const id = "60f00c7d55faea2e94996f11";
//             chai.request(server)
//                 .patch('/api/v1/tours/' + id)
//                 .send({
//                     "duration": 10,
//                     "maxGroupSize": 10,
//                 })
//                 .set('Authorization', 'Bearer ' + tokenAdmin)
//                 .end((err, response) => {
//                     response.should.have.status(200);
//                     response.body.should.be.a("object");
//                     done();
//                 });
//         });
//         it("It should not update the tour data", (done) => {
//             const id = "60f00c7d55faea2e94996f11";
//             chai.request(server)
//                 .patch('/api/v1/tour/' + id)
//                 .set('Authorization', 'Bearer ' + tokenAdmin)
//                 .end((err, response) => {
//                     response.should.have.status(500);
//                     done();
//                 });
//         });
//     });
//     describe("DELETE api/v1/tours/:id", () => {
//         it("It should delete the tour data", (done) => {
//             const id = "60f00c7d55faea2e94996f11";
//             chai.request(server)
//                 .delete('/api/v1/tours/' + id)
//                 .set('Authorization', 'Bearer ' + tokenAdmin)
//                 .end((err, response) => {
//                     response.should.have.status(200);
//                     response.body.should.be.a("object");
//                     done();
//                 });
//         });
//         it("It should not update the tour data", (done) => {
//             const id = "60f00c7d55faea2e94996f11";
//             chai.request(server)
//                 .delete('/api/v1/tour/' + id)
//                 .set('Authorization', 'Bearer ' + tokenAdmin)
//                 .end((err, response) => {
//                     response.should.have.status(500);
//                     done();
//                 });
//         });
//     });

// });



// // const request = require("supertest")("http://localhost:3000/api/v1");
// // const expect = require("chai").expect;

// // describe("GET /tours", function () {
// //     it("returns all tours", async function () {
// //         this.timeout(10000);

// //         const response = await request.get("/tours");

// //         expect(response.status).to.eql(200);
// //         expect(response.body.data.length).to.eql(30);
// //     });
// // });