import {
    describe,
    expect,
    jest,
    test,
    afterEach,
    beforeEach,
} from '@jest/globals';
import {commandFunc} from "./index.ts";
import { readFile, writeFile } from "node:fs/promises"
import { read } from 'node:fs';

jest.mock("node:fs/promises");

const mockLogFn = jest.fn();
const mockReadFn = jest.mocked(readFile);
const mockWriteFn = jest.mocked(writeFile);

const spyInstance = jest.spyOn(console, "log");

beforeEach(() => {
  spyInstance.mockImplementation(mockLogFn);
});

afterEach(() => {
  jest.resetAllMocks();
});

describe("Testing Day 2 Tasks", () => {
  test("Testing view:tasks function with no tasks", async () => {
    const json = {
      payload: [],
      _id: 0,
    };
    mockReadFn.mockResolvedValue(JSON.stringify(json));
    await commandFunc["view:tasks"]?.();
    expect(mockLogFn.mock.calls).toHaveLength(1);
    expect(mockLogFn.mock.calls[0]?.[0]).toBe(
      "No tasks added. Use add:tasks [task] to add tasks",
    );
  });


  test("Testing add:tasks function with no tasks", async () => {
    const json = {
      payload: [],
      _id: 0,
    };
    mockReadFn.mockResolvedValue(JSON.stringify(json));
    await commandFunc["add:tasks"]?.([]);
    expect(mockLogFn.mock.calls).toHaveLength(1);
    expect(mockLogFn.mock.calls[0]?.[0]).toBe(
      "Task should be provided as arguement. e.g. npm run add:tasks -- 'Some Task' ",
    );
  });

  test("Testing updateProgress:tasks function with no task id", async () => {
    const json = {
      payload: [],
      _id: 0,
    };
    mockReadFn.mockResolvedValue(JSON.stringify(json));
    await commandFunc["updateProgress:tasks"]?.(["id=2", "progress=2"]);
    expect(mockLogFn.mock.calls).toHaveLength(1);
    expect(mockLogFn.mock.calls[0]?.[0]).toBe("Task not found. Give valid id");
  });

  test("Testing updateProgress:tasks function with no valid progress", async () => {
    const json = {
      payload: [
        {
          id: "2",
          content: "some content",
          progress: "Completed",
        },
      ],
      _id: 2,
    };
    mockReadFn.mockResolvedValue(JSON.stringify(json));
    await commandFunc["updateProgress:tasks"]?.(["id=2", "progress=8"]);
    expect(mockLogFn.mock.calls).toHaveLength(1);
    expect(mockLogFn.mock.calls[0]?.[0]).toBe(
      "Invalid Input. Valid values for progress = 1 | 2 | 3",
    );
  });

  test("Testing delete:tasks function with no task id", async () => {
    const json = {
      payload: [],
      _id: 0,
    };
    mockReadFn.mockResolvedValue(JSON.stringify(json));
    await commandFunc["delete:tasks"]?.(["id="]);
    expect(mockLogFn.mock.calls).toHaveLength(1);
    expect(mockLogFn.mock.calls[0]?.[0]).toBe("Enter valid input.");
  });
});