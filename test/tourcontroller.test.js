const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const faker = require("faker");
const tourController = require("./../controller/tourcontroller");
const userController = require("./../controller/usercontroller");

const Tour = require("../models/tourModels");
const User = require("../models/userModels");

describe("TourController", function () {
    describe("getAllTours", function () {
        let req;
        let res;
        let next;
        // after(function () {
        //     Tour.find.restore();
        // });
        // it("Spy the Tour.find method", function () {
        //     var spy = sinon.spy(Tour, "find");
        //     tourController.getAllTours();
        //     expect(spy.calledOnce).to.be.true;
        // });
        it("Mock the tour.find method", function () {
            var mock = sinon.mock(Tour);
            var expectation = mock.expects("find");
            expectation.exactly(1);;
            tourController.getAllTours();
            mock.verify();
        });
    });
    describe("getTour", function () {
        it("Stub the tour.findById method", async function () {
            var stubData = {
                "status": "success",
                "data": {
                    "tour": {
                        "startLocation": {
                            "type": "Point",
                            "coordinates": [
                                -80.185942,
                                25.774772
                            ],
                            "description": "Miami, USA",
                            "address": "301 Biscayne Blvd, Miami, FL 33132, USA"
                        },
                        "ratingsAverage": 4,
                        "ratingsQuantity": 7,
                        "images": [
                            "tour-2-1.jpg",
                            "tour-2-2.jpg",
                            "tour-2-3.jpg"
                        ],
                        "startDates": [
                            "2021-06-19T09:00:00.000Z",
                            "2021-07-20T09:00:00.000Z",
                            "2021-08-18T09:00:00.000Z"
                        ],
                        "secretTour": false,
                        "guides": [
                            {
                                "role": "lead-guide",
                                "_id": "5c8a22c62f8fb814b56fa18b",
                                "name": "Miyah Myles",
                                "email": "miyah@example.com",
                                "photo": "user-12.jpg"
                            },
                            {
                                "role": "guide",
                                "_id": "5c8a1f4e2f8fb814b56fa185",
                                "name": "Jennifer Hardy",
                                "email": "jennifer@example.com",
                                "photo": "user-6.jpg"
                            }
                        ],
                        "_id": "5c88fa8cf4afda39709c2955",
                        "name": "The Sea Explorer",
                        "duration": 7,
                        "maxGroupSize": 15,
                        "difficulty": "medium",
                        "price": 497,
                        "summary": "Exploring the jaw-dropping US east coast by foot and by boat",
                        "description": "Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\nIrure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                        "imageCover": "tour-2-cover.jpg",
                        "locations": [
                            {
                                "type": "Point",
                                "coordinates": [
                                    -80.128473,
                                    25.781842
                                ],
                                "_id": "5c88fa8cf4afda39709c2959",
                                "day": 1
                            },
                            {
                                "type": "Point",
                                "coordinates": [
                                    -80.647885,
                                    24.909047
                                ],
                                "_id": "5c88fa8cf4afda39709c2958",
                                "day": 2
                            },
                            {
                                "type": "Point",
                                "coordinates": [
                                    -81.0784,
                                    24.707496
                                ],
                                "_id": "5c88fa8cf4afda39709c2957",
                                "day": 3
                            },
                            {
                                "type": "Point",
                                "coordinates": [
                                    -81.768719,
                                    24.552242
                                ],
                                "_id": "5c88fa8cf4afda39709c2956",
                                "day": 5
                            }
                        ],
                        "slug": "the-sea-explorer",
                        "__v": 0,
                        "durationWeeks": 1,
                        "reviews": [
                            {
                                "_id": "5c8a34ed14eb5c17645c9108",
                                "review": "Cras mollis nisi parturient mi nec aliquet suspendisse sagittis eros condimentum scelerisque taciti mattis praesent feugiat eu nascetur a tincidunt",
                                "rating": 5,
                                "user": null,
                                "tour": "5c88fa8cf4afda39709c2955",
                                "createdAt": "2021-06-18T15:47:14.655Z",
                                "__v": 0,
                                "id": "5c8a34ed14eb5c17645c9108"
                            },
                            {
                                "_id": "5c8a36b714eb5c17645c910f",
                                "review": "Pulvinar taciti etiam aenean lacinia natoque interdum fringilla suspendisse nam sapien urna!",
                                "rating": 4,
                                "user": {
                                    "_id": "5c8a1e1a2f8fb814b56fa182",
                                    "name": "Sophie Louise Hart",
                                    "photo": "user-3.jpg"
                                },
                                "tour": "5c88fa8cf4afda39709c2955",
                                "createdAt": "2021-06-18T15:47:14.656Z",
                                "__v": 0,
                                "id": "5c8a36b714eb5c17645c910f"
                            },
                            {
                                "_id": "60ed303306df636650a61a69",
                                "rating": 4,
                                "review": "Hel",
                                "tour": "5c88fa8cf4afda39709c2955",
                                "user": {
                                    "_id": "5c8a20d32f8fb814b56fa187",
                                    "name": "Elina",
                                    "photo": "user-8.jpg"
                                },
                                "createdAt": "2021-07-13T06:18:27.828Z",
                                "__v": 0,
                                "id": "60ed303306df636650a61a69"
                            },
                            {
                                "_id": "5c8a391f14eb5c17645c911f",
                                "review": "Sem feugiat sed lorem vel dignissim platea habitasse dolor suscipit ultricies dapibus",
                                "rating": 5,
                                "user": {
                                    "_id": "5c8a211f2f8fb814b56fa188",
                                    "name": "Cristian Vega",
                                    "photo": "user-9.jpg"
                                },
                                "tour": "5c88fa8cf4afda39709c2955",
                                "createdAt": "2021-06-18T15:47:14.661Z",
                                "__v": 0,
                                "id": "5c8a391f14eb5c17645c911f"
                            },
                            {
                                "_id": "5c8a3a7014eb5c17645c9124",
                                "review": "Blandit varius nascetur est felis praesent lorem himenaeos pretium dapibus tellus bibendum consequat ac duis",
                                "rating": 5,
                                "user": {
                                    "_id": "5c8a23c82f8fb814b56fa18d",
                                    "name": "Laura Wilson",
                                    "photo": "user-14.jpg"
                                },
                                "tour": "5c88fa8cf4afda39709c2955",
                                "createdAt": "2021-06-18T15:47:14.661Z",
                                "__v": 0,
                                "id": "5c8a3a7014eb5c17645c9124"
                            },
                            {
                                "_id": "5c8a3b7c14eb5c17645c912f",
                                "review": "Tempor pellentesque eu placerat auctor enim nam suscipit tincidunt natoque ipsum est.",
                                "rating": 5,
                                "user": {
                                    "_id": "5c8a23de2f8fb814b56fa18e",
                                    "name": "Max Smith",
                                    "photo": "user-15.jpg"
                                },
                                "tour": "5c88fa8cf4afda39709c2955",
                                "createdAt": "2021-06-18T15:47:14.663Z",
                                "__v": 0,
                                "id": "5c8a3b7c14eb5c17645c912f"
                            },
                            {
                                "_id": "5c8a3cdc14eb5c17645c913b",
                                "review": "Magna magnis tellus dui vivamus donec placerat vehicula erat turpis",
                                "rating": 5,
                                "user": {
                                    "_id": "5c8a24822f8fb814b56fa192",
                                    "name": "John Riley",
                                    "photo": "user-19.jpg"
                                },
                                "tour": "5c88fa8cf4afda39709c2955",
                                "createdAt": "2021-06-18T15:47:14.667Z",
                                "__v": 0,
                                "id": "5c8a3cdc14eb5c17645c913b"
                            }
                        ],
                        "id": "5c88fa8cf4afda39709c2955"
                    }
                }
            };
            var stub = sinon.stub(Tour, "findById").resolves(stubData);
            const tour = await tourController.getTour();
            console.log(tour);
            expect(tour).to.be.equal(stubData);
        });
    });
    describe("Tour-Stats", function () {
        after(function () {
            Tour.aggregate.restore();
        });
        it("Mock the tour-stat aggregate method", async function () {
            const stubTourStats = {
                "status": "success",
                "data": {
                    "stats": [
                        {
                            "_id": "difficult",
                            "numTours": 1,
                            "numRatings": 6,
                            "avgRating": 4.5,
                            "avgPrice": 997,
                            "minPrice": 997,
                            "maxPrice": 997
                        },
                        {
                            "_id": "easy",
                            "numTours": 3,
                            "numRatings": 21,
                            "avgRating": 4.766666666666667,
                            "avgPrice": 1030.3333333333333,
                            "minPrice": 397,
                            "maxPrice": 1497
                        },
                        {
                            "_id": "medium",
                            "numTours": 3,
                            "numRatings": 19,
                            "avgRating": 4.766666666666667,
                            "avgPrice": 1663.6666666666667,
                            "minPrice": 497,
                            "maxPrice": 2997
                        }
                    ]
                }
            };
            var stub = sinon.stub(Tour, "aggregate").resolves(stubTourStats);
            const tour = await tourController.getTourStats();
            expect(tour).to.be.equal(stubTourStats);
        });
    });
    describe("Create tour", function () {
        let status, json, res;
        beforeEach(() => {
            status = sinon.stub();
            json = sinon.spy();
            res = { json, status };
            status.returns(res);
        });
        it("Mock the tour-creation method", async function () {
            const req = {
                body: {
                    "ratingsAverage": 4.8,
                    "ratingsQuantity": 6,
                    "images": ["tour-2-1.jpg", "tour-2-2.jpg", "tour-2-3.jpg"],
                    "name": "Test tour 1",
                    "duration": 7,
                    "maxGroupSize": 15,
                    "difficulty": "medium",
                    "price": 497,
                    "description": "Tour description testing",
                    "imageCover": "tour-2-cover.jpg",
                }
            };
            const retuData = {
                "ratingsAverage": 4.8,
                "ratingsQuantity": 6,
                "images": ["tour-2-1.jpg", "tour-2-2.jpg", "tour-2-3.jpg"],
                "name": "Test tour 1",
                "duration": 7,
                "maxGroupSize": 15,
                "difficulty": "medium",
                "price": 497,
                "description": "Tour description testing",
                "imageCover": "tour-2-cover.jpg",
            }
            var stub = sinon.stub(Tour, "create").resolves(retuData);
            await tourController.createTour(req, res);
            expect(json.args[0][0].data).to.equal(retuData);
            expect(stub.calledOnce).to.be.true;
            expect(status.calledOnce).to.be.true;
            expect(status.args[0][0]).to.equal(201);
            expect(json.calledOnce).to.be.true;
        });
    });
    describe("Get tour within radius", function () {
        let req, res;
        beforeEach(() => {
            req = {
                params: {
                    distance: "400",
                    latlng: "34.111745, -118.113491",
                    unit: "mi"
                }
            };
            status = sinon.stub();
            json = sinon.spy();
            res = { json, status };
            status.returns(res);
        });
        it("It should return tour within radius", async function () {
            const stubData = [
                {
                    "startLocation": {
                        "type": "Point",
                        "coordinates": [
                            -122.29286,
                            38.294065
                        ],
                        "description": "California, USA",
                        "address": "560 Jefferson St, Napa, CA 94559, USA"
                    },
                    "ratingsAverage": 4.4,
                    "ratingsQuantity": 7,
                    "images": [
                        "tour-7-1.jpg",
                        "tour-7-2.jpg",
                        "tour-7-3.jpg"
                    ],
                    "startDates": [
                        "2021-02-12T10:00:00.000Z",
                        "2021-04-14T09:00:00.000Z",
                        "2021-09-01T09:00:00.000Z"
                    ],
                    "secretTour": false,
                    "guides": [
                        {
                            "role": "lead-guide",
                            "_id": "5c8a22c62f8fb814b56fa18b",
                            "name": "Miyah Myles",
                            "email": "miyah@example.com",
                            "photo": "user-12.jpg"
                        },
                        {
                            "role": "guide",
                            "_id": "5c8a23412f8fb814b56fa18c",
                            "name": "Ben Hadley",
                            "email": "ben@example.com",
                            "photo": "user-13.jpg"
                        }
                    ],
                    "_id": "5c88fa8cf4afda39709c296c",
                    "name": "The Wine Taster",
                    "duration": 5,
                    "maxGroupSize": 8,
                    "difficulty": "easy",
                    "price": 1997,
                    "summary": "Exquisite wines, scenic views, exclusive barrel tastings,  and much more",
                    "description": "Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\nIrure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                    "imageCover": "tour-7-cover.jpg",
                    "locations": [
                        {
                            "type": "Point",
                            "coordinates": [
                                -122.479887,
                                38.510312
                            ],
                            "_id": "5c88fa8cf4afda39709c296f",
                            "day": 1
                        },
                        {
                            "type": "Point",
                            "coordinates": [
                                -122.582948,
                                38.585707
                            ],
                            "_id": "5c88fa8cf4afda39709c296e",
                            "day": 3
                        },
                        {
                            "type": "Point",
                            "coordinates": [
                                -122.434697,
                                38.482181
                            ],
                            "_id": "5c88fa8cf4afda39709c296d",
                            "day": 5
                        }
                    ],
                    "slug": "the-wine-taster",
                    "__v": 0,
                    "durationWeeks": 0.7142857142857143,
                    "id": "5c88fa8cf4afda39709c296c"
                },
                {
                    "startLocation": {
                        "type": "Point",
                        "coordinates": [
                            -115.172652,
                            36.110904
                        ],
                        "description": "Las Vegas, USA",
                        "address": "3663 S Las Vegas Blvd, Las Vegas, NV 89109, USA"
                    },
                    "ratingsAverage": 4.7,
                    "ratingsQuantity": 7,
                    "images": [
                        "tour-5-1.jpg",
                        "tour-5-2.jpg",
                        "tour-5-3.jpg"
                    ],
                    "startDates": [
                        "2021-08-05T09:00:00.000Z",
                        "2022-03-20T10:00:00.000Z",
                        "2022-08-12T09:00:00.000Z"
                    ],
                    "secretTour": false,
                    "guides": [
                        {
                            "role": "lead-guide",
                            "_id": "5c8a21f22f8fb814b56fa18a",
                            "name": "Aarav Lynn",
                            "email": "aarav@example.com",
                            "photo": "user-11.jpg"
                        },
                        {
                            "role": "guide",
                            "_id": "5c8a23412f8fb814b56fa18c",
                            "name": "Ben Hadley",
                            "email": "ben@example.com",
                            "photo": "user-13.jpg"
                        },
                        {
                            "role": "guide",
                            "_id": "5c8a201e2f8fb814b56fa186",
                            "name": "Kate Morrison",
                            "email": "kate@example.com",
                            "photo": "user-7.jpg"
                        }
                    ],
                    "_id": "5c88fa8cf4afda39709c2961",
                    "name": "The Park Camper",
                    "duration": 10,
                    "maxGroupSize": 15,
                    "difficulty": "medium",
                    "price": 1497,
                    "summary": "Breathing in Nature in America's most spectacular National Parks",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum!",
                    "imageCover": "tour-5-cover.jpg",
                    "locations": [
                        {
                            "type": "Point",
                            "coordinates": [
                                -112.987418,
                                37.198125
                            ],
                            "_id": "5c88fa8cf4afda39709c2965",
                            "day": 1
                        },
                        {
                            "type": "Point",
                            "coordinates": [
                                -111.376161,
                                36.86438
                            ],
                            "_id": "5c88fa8cf4afda39709c2964",
                            "day": 4
                        },
                        {
                            "type": "Point",
                            "coordinates": [
                                -112.115763,
                                36.058973
                            ],
                            "_id": "5c88fa8cf4afda39709c2963",
                            "day": 5
                        },
                        {
                            "type": "Point",
                            "coordinates": [
                                -116.107963,
                                34.011646
                            ],
                            "_id": "5c88fa8cf4afda39709c2962",
                            "day": 9
                        }
                    ],
                    "slug": "the-park-camper",
                    "__v": 0,
                    "durationWeeks": 1.4285714285714286,
                    "id": "5c88fa8cf4afda39709c2961"
                },
                {
                    "startLocation": {
                        "type": "Point",
                        "coordinates": [
                            -118.803461,
                            34.006072
                        ],
                        "description": "California, USA",
                        "address": "29130 Cliffside Dr, Malibu, CA 90265, USA"
                    },
                    "ratingsAverage": 3.9,
                    "ratingsQuantity": 7,
                    "images": [
                        "tour-6-1.jpg",
                        "tour-6-2.jpg",
                        "tour-6-3.jpg"
                    ],
                    "startDates": [
                        "2021-07-19T09:00:00.000Z",
                        "2021-09-06T09:00:00.000Z",
                        "2022-03-18T10:00:00.000Z"
                    ],
                    "secretTour": false,
                    "guides": [
                        {
                            "role": "lead-guide",
                            "_id": "5c8a21f22f8fb814b56fa18a",
                            "name": "Aarav Lynn",
                            "email": "aarav@example.com",
                            "photo": "user-11.jpg"
                        },
                        {
                            "role": "guide",
                            "_id": "5c8a1f292f8fb814b56fa184",
                            "name": "Leo Gillespie",
                            "email": "leo@example.com",
                            "photo": "user-5.jpg"
                        },
                        {
                            "role": "guide",
                            "_id": "5c8a1f4e2f8fb814b56fa185",
                            "name": "Jennifer Hardy",
                            "email": "jennifer@example.com",
                            "photo": "user-6.jpg"
                        }
                    ],
                    "_id": "5c88fa8cf4afda39709c2966",
                    "name": "The Sports Lover",
                    "duration": 14,
                    "maxGroupSize": 8,
                    "difficulty": "difficult",
                    "price": 2997,
                    "summary": "Surfing, skating, parajumping, rock climbing and more, all in one tour",
                    "description": "Nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\nVoluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur!",
                    "imageCover": "tour-6-cover.jpg",
                    "locations": [
                        {
                            "type": "Point",
                            "coordinates": [
                                -118.809361,
                                34.003098
                            ],
                            "_id": "5c88fa8cf4afda39709c296b",
                            "day": 1
                        },
                        {
                            "type": "Point",
                            "coordinates": [
                                -118.47549,
                                33.987367
                            ],
                            "_id": "5c88fa8cf4afda39709c296a",
                            "day": 4
                        },
                        {
                            "type": "Point",
                            "coordinates": [
                                -116.830104,
                                33.022843
                            ],
                            "_id": "5c88fa8cf4afda39709c2969",
                            "day": 6
                        },
                        {
                            "type": "Point",
                            "coordinates": [
                                -118.4547,
                                35.710359
                            ],
                            "_id": "5c88fa8cf4afda39709c2968",
                            "day": 7
                        },
                        {
                            "type": "Point",
                            "coordinates": [
                                -119.600492,
                                37.742371
                            ],
                            "_id": "5c88fa8cf4afda39709c2967",
                            "day": 10
                        }
                    ],
                    "slug": "the-sports-lover",
                    "__v": 0,
                    "durationWeeks": 2,
                    "id": "5c88fa8cf4afda39709c2966"
                }
            ];
            var stub = sinon.stub(Tour, "find").resolves(stubData);
            await tourController.getToursWithin(req, res);
            expect(json.args[0][0].data).to.equal(stubData);
            expect(stub.calledOnce).to.be.true;
            expect(status.calledOnce).to.be.true;
            expect(status.args[0][0]).to.equal(200);
            expect(json.calledOnce).to.be.true;
        });
    });
    describe("Get distances to tours from points", function () {
        beforeEach(() => {
            req = {
                params: {
                    latlng: "34.111745, -118.113491",
                    unit: "mi"
                }
            };
            status = sinon.stub();
            json = sinon.spy();
            res = { json, status };
            status.returns(res);
        });
        after(function () {
            Tour.aggregate.restore();
        });
        it("It should return distances of points from a particular tour", async function () {
            const stubData = [
                {
                    "_id": "5c88fa8cf4afda39709c2966",
                    "name": "The Sports Lover",
                    "distance": 40.208593926228964
                },
                {
                    "_id": "5c88fa8cf4afda39709c2961",
                    "name": "The Park Camper",
                    "distance": 216.34066637146643
                },
                {
                    "_id": "5c88fa8cf4afda39709c296c",
                    "name": "The Wine Taster",
                    "distance": 371.5311591072119
                },
                {
                    "_id": "5c88fa8cf4afda39709c2970",
                    "name": "The Star Gazer",
                    "distance": 528.3780920246626
                },
                {
                    "_id": "5c88fa8cf4afda39709c295a",
                    "name": "The Snow Adventurer",
                    "distance": 717.5730935765054
                },
                {
                    "_id": "5c88fa8cf4afda39709c2951",
                    "name": "The Forest Hiker",
                    "distance": 1187.3943128647084
                },
                {
                    "_id": "5c88fa8cf4afda39709c2974",
                    "name": "The Northern Lights",
                    "distance": 1966.1549760075259
                },
                {
                    "_id": "5c88fa8cf4afda39709c2955",
                    "name": "The Sea Explorer",
                    "distance": 2331.0053470933353
                },
                {
                    "_id": "5c88fa8cf4afda39709c295d",
                    "name": "The City Wanderer",
                    "distance": 2440.679820227154
                }
            ];
            var stub = sinon.stub(Tour, "aggregate").resolves(stubData);
            await tourController.getDistances(req, res);
            expect(json.args[0][0].data).to.equal(stubData);
            expect(stub.calledOnce).to.be.true;
            expect(status.calledOnce).to.be.true;
            expect(status.args[0][0]).to.equal(200);
            expect(json.calledOnce).to.be.true;
        })
    })
    describe("Get monthly plan", function () {
        let req;
        beforeEach(() => {
            req = {
                params: {
                    year: 2021
                }
            };
            status = sinon.stub();
            json = sinon.spy();
            res = { json, status };
            status.returns(res);
        });
        after(function () {
            Tour.aggregate.restore();
        });
        it("It should return monthly plan for given year", async function () {
            const stubData = [
                {
                    "numTourStarts": 3,
                    "tours": [
                        "The Sea Explorer",
                        "The Forest Hiker",
                        "The Sports Lover"
                    ],
                    "month": 7
                },
                {
                    "numTourStarts": 2,
                    "tours": [
                        "The Sports Lover",
                        "The Wine Taster"
                    ],
                    "month": 9
                },
                {
                    "numTourStarts": 2,
                    "tours": [
                        "The Forest Hiker",
                        "The Wine Taster"
                    ],
                    "month": 4
                },
                {
                    "numTourStarts": 2,
                    "tours": [
                        "The Sea Explorer",
                        "The City Wanderer"
                    ],
                    "month": 6
                },
                {
                    "numTourStarts": 2,
                    "tours": [
                        "The City Wanderer",
                        "The Star Gazer"
                    ],
                    "month": 3
                },
                {
                    "numTourStarts": 2,
                    "tours": [
                        "The Forest Hiker",
                        "The Star Gazer"
                    ],
                    "month": 10
                },
                {
                    "numTourStarts": 2,
                    "tours": [
                        "The Sea Explorer",
                        "The Park Camper"
                    ],
                    "month": 8
                },
                {
                    "numTourStarts": 1,
                    "tours": [
                        "The City Wanderer"
                    ],
                    "month": 5
                },
                {
                    "numTourStarts": 1,
                    "tours": [
                        "The Northern Lights"
                    ],
                    "month": 12
                },
                {
                    "numTourStarts": 1,
                    "tours": [
                        "The Wine Taster"
                    ],
                    "month": 2
                }
            ];
            var stub = sinon.stub(Tour, "aggregate").resolves(stubData);
            await tourController.getMonthlyPlan(req, res);
            expect(json.args[0][0].data).to.equal(stubData);
            expect(stub.calledOnce).to.be.true;
            expect(status.calledOnce).to.be.true;
            expect(status.args[0][0]).to.equal(200);
            expect(json.calledOnce).to.be.true;
        })
    });
    describe("Delete a tour", function () {
        beforeEach(() => {
            req = {
                params: {
                    id: "60eb976e805edd5a38267794",
                }
            };
            status = sinon.stub();
            json = sinon.spy();
            res = { json, status };
            status.returns(res);
        });
        it("It should delete a tour", async function () {
            after(function () {
                Tour.find();
            });
            const stubData = {
                "doc": {
                    "startLocation": {
                        "type": "Point",
                        "description": "Miami, USA",
                        "coordinates": [
                            -80.185942,
                            25.774772
                        ],
                        "address": "301 Biscayne Blvd, Miami, FL 33132, USA"
                    },
                    "ratingsAverage": 4.8,
                    "ratingsQuantity": 6,
                    "images": [
                        "tour-2-1.jpg",
                        "tour-2-2.jpg",
                        "tour-2-3.jpg"
                    ],
                    "createdAt": "2021-07-12T00:13:20.578Z",
                    "startDates": [
                        "2021-06-19T09:00:00.000Z",
                        "2021-07-20T09:00:00.000Z",
                        "2021-08-18T09:00:00.000Z"
                    ],
                    "secretTour": false,
                    "guides": [],
                    "_id": "60eb976e805edd5a38267794",
                    "name": "Test tour 1",
                    "duration": 7,
                    "maxGroupSize": 15,
                    "difficulty": "medium",
                    "price": 497,
                    "summary": "Exploring the jaw-dropping US east coast by foot and by boat",
                    "description": "Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\nIrure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                    "imageCover": "tour-2-cover.jpg",
                    "locations": [
                        {
                            "type": "Point",
                            "coordinates": [
                                -80.128473,
                                25.781842
                            ],
                            "_id": "5c88fa8cf4afda39709c2959",
                            "day": 1
                        },
                        {
                            "type": "Point",
                            "coordinates": [
                                -80.647885,
                                24.909047
                            ],
                            "_id": "5c88fa8cf4afda39709c2958",
                            "day": 2
                        },
                        {
                            "type": "Point",
                            "coordinates": [
                                -81.0784,
                                24.707496
                            ],
                            "_id": "5c88fa8cf4afda39709c2957",
                            "day": 3
                        },
                        {
                            "type": "Point",
                            "coordinates": [
                                -81.768719,
                                24.552242
                            ],
                            "_id": "5c88fa8cf4afda39709c2956",
                            "day": 5
                        }
                    ],
                    "slug": "test-tour-1",
                    "__v": 0,
                    "durationWeeks": 1,
                    "id": "60eb976e805edd5a38267794"
                }
            };
            var stub = sinon.stub(Tour, "findByIdAndDelete").resolves(stubData);
            await tourController.deleteTour(req, res);
            expect(json.args[0][0].data).to.equal(stubData);
            expect(stub.calledOnce).to.be.true;
            expect(status.calledOnce).to.be.true;
            expect(status.args[0][0]).to.equal(200);
            expect(json.calledOnce).to.be.true;
        })
    })
});
