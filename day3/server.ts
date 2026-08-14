import { error } from "node:console";
import http from "node:http";

export type Task = {
    id: number;
    content: string;
    progress: "To Do" | "In Progress" | "Completed";
};

export type TaskResponseJSON = {
    payload: Task[];
    _id: number;
};

export const tasks: TaskResponseJSON = {
    payload: [],
    _id: 0,
};

interface Message {
    message: string;
}

export class HTTPError extends Error{
    statusCode: number;
    constructor(message: string, statusCode: number){
        super(message);
        this.statusCode = statusCode;
    }
}

type Method = "GET" | "POST" | "PATCH" | "DELETE";

export function getTasks(id: number){
    const task = tasks.payload.find((each) => each.id === id);
    if(!task){
        throw new HTTPError("Invalid id", 400);
    }
    return task;

}

export function addTask(body: string): Message{
    if(body === ""){
        throw new HTTPError("Invalid input", 400);
    }
    let requestBody: Partial<Task>;
    try{
        requestBody = JSON.parse(body);
    }catch(err){
        throw new HTTPError("Invalid input", 400);
    }
    const content = requestBody.content ?? "";
    if(content === ""){
        throw new HTTPError("Invalid input", 400);
    }
    const id = ++tasks._id;
    const task: Task = {
        id: id,
        content: content,
        progress: "To Do",
    };
    tasks.payload = [...tasks.payload, task];
    return {message: "Task Added"};
}

export function updateTask(body: string, id: number): Message{
    let data: Partial<Task>;
    try{
        data = JSON.parse(body);
    }catch(err){
        throw new HTTPError("Invalid input", 400);
    }
    const {content, progress} = data;
    const task = tasks.payload.find((each) => each.id === id);
    if(!task){
        throw new HTTPError("Invalid input, id not provided", 400);
    }
    task.content = content ?? task.content;
    task.progress = progress ?? task.progress;

    return{ message: `Task of id: ${id} was updated` }
}

export function deleteTask(id: number): Message{
    tasks.payload = tasks.payload.filter((each) => each.id !== id);
    return {message: `Task of id: ${id} was deleted `};
}

export function handleRequest(method: Method, url: string, body: string,): TaskResponseJSON | Message | Task {
  const regex = /^\/tasks\/(?<id>[0-9]+)\/?$/;
  if (url === "/tasks") {
    if (method === "POST") {
      return addTask(body);
    }
    if (method === "GET") {
      return tasks;
    }
    throw new HTTPError("Method Not Allowed", 405);
  }
  if (regex.test(url)) {
    const id = regex.exec(url)?.[1];
    if (!id) {
      throw new HTTPError("Page not found", 404);
    }
    if (!parseInt(id)) {
      throw new HTTPError("Page not found", 404);
    }
    if (method === "GET") {
      return getTasks(parseInt(id));
    }
    if (method === "PATCH") {
      return updateTask(body, parseInt(id));
    }
    if (method === "DELETE") {
      return deleteTask(parseInt(id));
    }
    throw new HTTPError("Method Not Allowed", 405);
  }
  if (url === "/") {
    return { message: "Working" };
  }
  throw new HTTPError("Page not found", 404);
}

const server = http.createServer((request, response) => {
  const { headers, method = "GET", url = "/" } = request;
  let bodyArray: Uint8Array<ArrayBufferLike>[] = [];
  request
    .on("error", (err) => {
      console.error(err);
    })
    .on("data", (chunk) => {
      bodyArray.push(chunk);
    })
    .on("end", () => {
      const requestBody: string = Buffer.concat(bodyArray).toString();

      let body: TaskResponseJSON | Message | Task;
      let statusCode: number = 200;
      try {
        body = handleRequest(method as Method, url, requestBody);
      } catch (err) {
        if (err instanceof HTTPError) {
          statusCode = err.statusCode;
        }
        body = { message: (err as Error).message };
      }

      response.on("error", (err) => {
        console.error(err);
      });

      response.writeHead(statusCode, { "Content-Type": "application/json" });

      const responseBody = { headers, method, url, body };

      response.end(JSON.stringify(responseBody));
    });
});

if (process.env.NODE_ENV !== "test") {
  server.listen(3000);
}