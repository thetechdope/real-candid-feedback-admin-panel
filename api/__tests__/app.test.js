import request from "supertest";
import app from "../app.js";

describe("/", () => {
  it("GET /", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.body.text).toBe(
      "Hello! This is Real Admin Feedback Application API."
    );
  });
});
