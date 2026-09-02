import request from "supertest";
import app from "./app";

let id: string = "";

describe("Testing server: app.ts", () => {
  test("Testing path /health GET", async () => {
    const response = await request(app).get("/health");

    expect(response.body.status).toEqual("up");
  });

  test("Testing path /tickets GET", async () => {
    const response = await request(app).get("/tickets");
    expect(response.body.payload).toEqual([]);
  });

  test("Testing path /tickets POST", async () => {
    const responseOne = await request(app).post("/tickets").send({
      title: "some title",
      description: "some description",
      priority: "low",
      category_id: 1,
      customer: "vaisakh",
    });

    const responseTwo = await request(app).get("/tickets");

    expect(responseOne.body.message.startsWith("Ticket of id:")).toBeTruthy();

    id = responseTwo.body.payload[0].ticket_id;

    expect(responseTwo.body.payload).toHaveLength(1);
  });

  test("Testing path /tickets/:id GET", async () => {
    const response = await request(app).get(`/tickets/${id}`);

    expect(response.body.title).toBe("some title");
  });

  test("Testing path /tickets/:id/status PATCH", async () => {
    const responseOne = await request(app)
      .patch(`/tickets/${id}/status`)
      .send({ status: "complete" });

    const responseTwo = await request(app).get(`/tickets/${id}`);

    expect(responseOne.body).toEqual({
      message: `Ticket of id: ${id} was updated`,
    });

    expect(responseTwo.body.status).toBe("complete");
  });

  test("Testing path /tickets/:id/assignee PATCH", async () => {
    const responseOne = await request(app)
      .patch(`/tickets/${id}/assignee`)
      .send({ assignee: "vaisakh" });

    const responseTwo = await request(app).get(`/tickets/${id}`);

    expect(responseOne.body).toEqual({
      message: `Ticket of id: ${id} was updated`,
    });

    expect(responseTwo.body.assignee).toBe("vaisakh");
  });

  test("Testing path /tickets/:id DELETE", async () => {
    const responseOne = await request(app).delete(`/tickets/${id}`);

    const responseTwo = await request(app).get("/tickets");

    expect(responseOne.body).toEqual({
      message: `Ticket of id: ${id} was deleted`,
    });

    expect(responseTwo.body).toEqual({
      payload: [],
    });
  });
});