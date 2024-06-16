const request = require("supertest");
const app = require("../server");
const authenticate = require("../src/middlewares/authenticate");
const { admin } = require("../src/utils/firebase");

jest.mock("../src/utils/firebase", () => ({
  admin: {
    auth: () => ({
      verifyIdToken: jest.fn().mockResolvedValue({ uid: "test-uid" }),
    }),
  },
}));

app.get("/protected", authenticate, (req, res) => {
  res.status(200).json({ message: "You are authenticated" });
});

describe("Authentication Middleware", () => {
  it("should return 401 if no Authorization header is present", async () => {
    const response = await request(app).get("/protected");
    expect(response.status).toBe(401);
    expect(response.body.error).toBe("Authorization header missing");
  });

  it("should return 401 if Authorization header does not start with Bearer", async () => {
    const response = await request(app)
      .get("/protected")
      .set("Authorization", "Token abc123");
    expect(response.status).toBe(401);
    expect(response.body.error).toBe("Invalid Authorization format");
  });

  it("should authenticate successfully with valid token", async () => {
    const response = await request(app)
      .get("/protected")
      .set("Authorization", "Bearer validToken");

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("You are authenticated");
  });
});
