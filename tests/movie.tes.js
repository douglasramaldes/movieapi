const request = require("supertest");
const app = require("../server");
const admin = require("firebase-admin");

jest.mock("firebase-admin", () => {
  const actualAdmin = jest.requireActual("firebase-admin");
  return {
    ...actualAdmin,
    initializeApp: jest.fn(),
    auth: () => ({
      verifyIdToken: jest.fn().mockResolvedValue({ uid: "some-uid" }),
    }),
  };
});

describe("GET /movies", () => {
  it("should return a list of movies", async () => {
    const res = await request(app)
      .get("/api/movies")
      .set("Authorization", "Bearer token");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});
