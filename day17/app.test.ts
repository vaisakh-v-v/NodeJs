import request from "supertest";
import app from "./app";
import prisma from "./database/init";

let id: string = "";

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Testing server: app.ts happy test endpoints", () => {
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
      customer: "benison",
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
      .send({ assignee: "benison" });

    const responseTwo = await request(app).get(`/tickets/${id}`);

    expect(responseOne.body).toEqual({
      message: `Ticket of id: ${id} was updated`,
    });

    expect(responseTwo.body.assignee).toBe("benison");
  });

  test("Testing path /tickets/:id DELETE", async () => {
    const responseOne = await request(app).delete(`/tickets/${id}`);

    const responseTwo = await request(app).get("/tickets");

    expect(responseOne.body).toEqual({
      message: `Ticket of id: ${id} was deleted`,
    });

    expect(responseTwo.body).toEqual({
      limit: 30,
      page: 0,
      total: 0,
      payload: [],
    });
  });
});

describe("Testing app.ts failure endpoints", () => {
  test("Testing path /tickets POST", async () => {
    const responseOne = await request(app).post("/tickets").send({
      title: "some title",
      description: "some description",
      // priority: "low",
      category_id: 1,
      customer: "benison",
    });

    const responseTwo = await request(app).get("/tickets");

    expect(
      responseOne.body.message.startsWith("Priority not found"),
    ).toBeTruthy();

    expect(responseTwo.body.payload).toHaveLength(0);
  });

  test("Testing path /tickets POST", async () => {
    const responseOne = await request(app).post("/tickets").send({
      title: "some title",
      description: "some description",
      priority: "low",
      category_id: 7,
      customer: "benison",
    });

    const responseTwo = await request(app).get("/tickets");

    expect(responseOne.body.message).toBe("Invalid input");

    expect(responseTwo.body.payload).toHaveLength(0);
  });
  test("Testing path /tickets/:id with non existing id", async () => {
    const responseOne = await request(app).get("/tickets/21");

    expect(responseOne.body.message).toBe("Page not found");
  });

  test("Testing wrong /tickets with non existing filter params", async () => {
    const responseOne = await request(app).get("/tickets?sortField=xyz");

    expect(responseOne.body.message).toBe("Enter a valid query params");
  });
});