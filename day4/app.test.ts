import request from "supertest";
import app from "./app.ts";

describe("Testing servr: app.ts", () =>{
    test("Testing path / GET",async () => {
        const response = await request(app).get("/");
        expect(response.body.message).toEqual("Working");
    });
    test("Testing path /tasks GET", async () =>{
        const response = await request(app).get("/tasks");
        expect(response.body).toEqual({
            payload: [],
            _id: 0,
        });
    });
    test("Testing path /tasks POST", async () =>{
        const responseOne = await request(app).post("/tasks").send({content: "Some Task"});
        const responseTwo = await request(app).get("/tasks");
        expect(responseOne.body).toEqual({
            message: "Task Added",
        });
            expect(responseTwo.body).toEqual({
                payload: [
                {
                    id: 1,
                    content: "Some Task",
                    progress: "To Do",
                },
            ],
            _id: 1,
        });
    });
    test("Testing path /tasks/:id GET", async () =>{
        const response = await request(app).get("/tasks/1");

        expect(response.body).toEqual({
            id: 1,
            content: "Some Task",
            progress: "To Do",
        });
    });
    test("Testing path /tasks/:id PATCH", async () =>{
        const responseOne = await request(app).patch("/tasks/1").send({progress: "Completed"});
        const responseTwo = await request(app).get("/tasks/1");
        expect(responseOne.body).toEqual({
            message: "Task of id: 1 was updated",
        });
        expect(responseTwo.body).toEqual({
            id: 1,
            content: "Some Task",
            progress: "Completed",
        });
    });

    test("Testing path /tasks/:id DELETE", async () =>{
        const responseOne = await request(app).delete("/tasks/1");
        const responseTwo = await request(app).get("/tasks");
        expect(responseOne.body).toEqual({
            message: "Task of id: 1 was deleted",
        });
        expect(responseOne.body).toEqual({
            message: "Task of id: 1 was deleted",
        });
        expect(responseTwo.body).toEqual({
            payload: [],
            _id: 1,
        });

    });
});