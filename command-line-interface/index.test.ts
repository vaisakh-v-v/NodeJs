
import { getAllArguments, commandCallbacks } from "./index.ts";


const mockFn = jest.fn();
const spyInstance = jest.spyOn(console, "log");

afterEach(() =>{
    jest.resetAllMocks();
});

describe("Testing Day 1 Tasks", () =>{
    test("Testing get all argument func", () => {
        expect(getAllArguments()).toHaveLength(0);
        const args: Array<string> = ["--dir", "--env"];
        args.forEach((element) =>{
            (process.argv as Array<string>).push(element);
        });
        expect(getAllArguments()).toHaveLength(2);
    });
    test("Testing --version callbacks", () =>{
        spyInstance.mockImplementation(mockFn);
        commandCallbacks["--version"]?.();
        expect(mockFn.mock.calls).toHaveLength(1);
        expect(mockFn).toHaveBeenNthCalledWith(1," System Version : #28~24.04.1-Ubuntu SMP PREEMPT_DYNAMIC Wed Jul  1 15:50:57 UTC 2");
    });

    test("Testing --os callback", () => {
    spyInstance.mockImplementation(mockFn);
    commandCallbacks["--os"]?.();
    expect(mockFn.mock.calls).toHaveLength(1);
   expect(mockFn).toHaveBeenNthCalledWith(
  1, 
  expect.stringMatching(/^System OS :/)
);

  });

  test("Testing --env callback", () => {
    spyInstance.mockImplementation(mockFn);
    commandCallbacks["--env"]?.();
    expect(mockFn.mock.calls).toHaveLength(1);
    expect(mockFn).toHaveBeenCalledWith("Environment: test");

  });
});
