import mongoose from "mongoose";
import request from "supertest";
import app from "../app.js";

const mongoURI = process.env.TEST_MONGO_URI || "mongodb://localhost:27017/jest"; // Use a separate test database

// Mock Database Connection
beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
  }
});

// Close Database Connection After Tests
afterAll(async () => {
  await mongoose.connection.close();
});

// Tests
describe("App Routes and Middleware", () => {
  it("should return 404 for undefined routes", async () => {
    const res = await request(app).get("/undefined-route");
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: "Not found - /undefined-route" });
  });

  it("should handle the /api/user route", async () => {
    const res = await request(app).get("/api/user");
    expect(res.status).toBe(200); // Adjust according to your route implementation
  });

  it("should handle the /api/posts route", async () => {
    const res = await request(app).get("/api/posts");
    expect(res.status).toBe(200); // Adjust according to your route implementation
  });

  it("should return a 404 error for invalid routes", async () => {
    const res = await request(app).get("/invalid-route");
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: "Not found - /invalid-route" });
  });

  it("should return a 500 error if a server error occurs", async () => {
    const res = await request(app).get("/api/test-error");
    expect(res.status).toBe(500);
    expect(res.body.message).toBe("Test Server Error");
  });  
});
