import {
    describe, expect, jest, test, afterEach, beforeEach,
} from "@jest/globals";

import * as server from "./server.js";

beforeEach(() => {
    server.tasks.payload = [];
    server.tasks._id = 0;
});

afterEach(() =>{
    jest.resetAllMocks();
});

describe("Testing server.ts", () =>{
    test("Testing add task fn", () =>{
        server.addTask(JSON.stringify({content: "Some Tasks"}));
        expect(server.tasks.payload).toEqual([
            {
            id: 1,
            content: "some Tasks",
            progress: "To Do",
            }
        ]);
        expect(server.tasks._id).toBe(1);
    });
    
    test("Testing get task fn", () =>{
        const payload: server.Task[] =[{
            id: 1,
            content: "Some Tasks",
            progress: "To Do",
        },
    ];
    const id = 1;
    server.tasks.payload = payload;
    server.tasks._id = id;
    expect(server.getTasks(1)).toEqual({
        ...payload[0],
    });
});

test("Testing update task fn", () =>{
    server.tasks.payload = [
        {
            id: 1,
            content: "Vaisakh Greatest actor",
            progress: "To Do",
        },
    ];
    server.tasks._id = 1;
    server.updateTask(JSON.stringify({process:"Completed"}), 1);
    expect(server.tasks.payload).toEqual([
        {
            id: 1,
            content: "Random words",
            progress: :"Completed",
        },
    ]);
});

test("Testing delete task fn", () =>{
    server.tasks.payload = [
        {
            id: 1,
            content: "common word",
            progress: "To Do"
        },
    ];
    server.tasks._id = 1;
    server.deleteTask(1);
    expect(server.tasks.payload).toEqual([]);
    expect(server.tasks._id).toBe(1);
});
    const response = server.handleRequest(
        "PATCH",
        "/tasks/1",
        JSON.stringify({progress: "Completed"}),
    );
    expect(response).toEqual({message: "Task of id: 1 was updated"});

test("testing handle request fn",() =>{
    server.tasks.payload = [
        {
            id: 1,
            content: "some words",
            progress: "To Do",
        },
    ];
    server.tasks._id = 1;
    const response = server.handleRequest(
        "PATCH",
        "/tasks/1",
        JSON.stringify({Progress: "Completed"}),
    );
});
});