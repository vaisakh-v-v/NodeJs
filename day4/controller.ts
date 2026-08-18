import { type Task, type TaskResponseJSON, type Message, HTTPError } from "./types.ts";
import { type Request, type Response } from "express";
const tasks: TaskResponseJSON = {
  payload: [],
  _id: 0,
};

function getTasks(id: number) {
  const task = tasks.payload.find((each) => each.id === id);
  if (!task) {
    throw new HTTPError("Invalid id", 400);
  }
  return task;
}

function addTasks(body: Partial<Task>): Message {
  const content = body.content ?? "";
  if (content === "") {
    throw new HTTPError("Invalid input", 400);
  }
  const id = ++tasks._id;
  const task: Task = {
    id: id,
    content: content,
    progress: "To Do",
  };
  tasks.payload = [...tasks.payload, task];
  return { message: "Task Added" };
}

function updateTask(body: Partial<Task>, id: number): Message {
  const { content, progress } = body;
  const task = tasks.payload.find((each) => each.id === id);
  if (!task) {
    throw new HTTPError("Invalid input, id not provided", 400);
  }
  task.content = content ?? task.content;
  task.progress = progress ?? task.progress;

  return { message: `Task of id: ${id} was updated` };
}

function deleteTask(id: number): Message {
  tasks.payload = tasks.payload.filter((each) => each.id !== id);
  return { message: `Task of id: ${id} was deleted` };
}

export const handleGetTasks = (req: Request, res: Response) => {
  res.json(tasks);
};

export const handleAddTasks = (req: Request, res: Response) => {
  const responseBody = addTasks(req.body);

  res.json(responseBody);
};

export const handleGetTask = (req: Request<{ id: string }>, res: Response) => {
  const id = parseInt(req.params.id);

  if (!id) {
    throw new HTTPError("Invalid params", 404);
  }

  const responseBody = getTasks(id);

  res.json(responseBody);
};

export const handleUpdateTask = (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const id = parseInt(req.params.id);

  if (!id) {
    throw new HTTPError("Invalid params", 404);
  }

  const responseBody = updateTask(req.body, id);

  res.json(responseBody);
};

export const handleDeleteTask = (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const id = parseInt(req.params.id);

  if (!id) {
    throw new HTTPError("Invalid params", 404);
  }

  const responseBody = deleteTask(id);

  res.json(responseBody);
};