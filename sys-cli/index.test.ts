import { after, mock } from "node:test";
import { getAllArguments, commandCallbacks } from "./index";
import { describe, expect, jest, test, afterEach } from "@jest/globals";

const mockFn = jest.fn();
const spyInstance = jest.spyOn(console, "log");

afterEach(() =>{
    jest.resetAllMocks();
});

describe("Testing Day 1 Tasks", () =>{
    test("Testing Get All Arguments Func", () =>{
        expect(getAllArguments()).toHaveLength(0);
        const args: Array<string> = ["--dir", "--env"];
        args.forEach((element) =>{
            (process.argv as Array<string>).push(element);
        });
        expect(getAllArguments()).toHaveLength(2)

});

test("Testing --version callbacks", () =>{
    spyInstance.mockImplementation(mockFn);
    commandCallbacks["--version"]();
    expect(mockFn.mock.calls).toHaveLength(2);
    expect(mockFn.mock.calls[0][0]).toBe("System Version : ")
});

test("Testing --dir callback", () =>{
    spyInstance.mockImplementation(mockFn);
    commandCallbacks["--dir"]();
    expect(mockFn.mock.calls).toHaveLength(1);
    expect(mockFn.mock.calls[0][0]).toBe(
        "currnet Directory: /home/vaisakh.v/NodeJs/sys-cli"
    );
});

test("Testing --os callback", () =>{
    spyInstance.mockImplementation(mockFn);
    commandCallbacks["--os"]();
    expect(mockFn.mock.calls).toHaveLength(1);
    expect(
        (mockFn.mock.calls[0][0] as string).startsWith("System os:")
    ).toBeTruthy();
});

test("Testing --env callback", () =>{
    spyInstance.mockImplementation(mockFn);
    commandCallbacks["--env"]();
    expect(mockFn.mock.calls).toHaveLength(1);
    expect(mockFn.mock.calls[0][0]).toBe("Environment: test");
    });
});
