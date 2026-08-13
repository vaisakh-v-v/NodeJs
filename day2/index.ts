import process from "node:process";
import { readFile, writeFile } from "node:fs/promises";

type Task = {
  id: string;
  content: string | undefined;
  progress: "To Do" | "In Progress" | "Completed";
};

type TaskResponseJSON = {
  payload: Task[];
  _id: number;
};

const fetchJSON = async () => {
  try {
    const file = await readFile(`./tasks.json`, "utf8");
    return JSON.parse(file);
  } catch (e) {
    console.error(e);
  }
};

const updateJSON = async (data: TaskResponseJSON) => {
  try {
    const promise = await writeFile("./file.json", JSON.stringify(data));
    return promise;
  } catch (e) {
    console.error(e);
  }
};

export const commandFunc: Record<string, (arg?: string[]) => void> = {
  "view:tasks": async () => {
    const tasks: TaskResponseJSON = await fetchJSON();
    if (!tasks.payload.length) {
      console.log("No tasks added. Use add:tasks [task] to add tasks");
      return;
    }
    tasks.payload.forEach((element) => {
      console.log(`ID: ${element.id}`);
      console.log(`${element.content}`);
      console.log(`Progress: ${element.progress}`);
      console.log("");
    });
  },
  "add:tasks": async (args) => {
    const tasks: TaskResponseJSON = await fetchJSON();
    const id: number = ++tasks._id;
    if (!args?.length) {
      console.log(
        "Task should be provided as arguement. e.g. npm run add:tasks -- 'Some Task' ",
      );
      return;
    }
    const task: Task = {
      id: `${id}`,
      content: args[0],
      progress: "To Do",
    };
    const updatedTasks: TaskResponseJSON = {
      payload: [...tasks.payload, task],
      _id: id,
    };
    updateJSON(updatedTasks);
    console.log("Task Added.");
  },
  "updateProgress:tasks": async (args) => {
    const tasks: TaskResponseJSON = await fetchJSON();
    if (!args) {
      console.log(
        "Task should be provided as arguement. e.g. npm run updateProgress:tasks -- id=1 progress=2",
      );
      return;
    }
    if (args?.length < 2) {
      console.log(
        "Task should be provided as arguement. e.g. npm run updateProgress:tasks -- id=1 progress=2",
      );
      return;
    }

    if (!args[0]?.startsWith("id=")) {
      console.log(
        "Task should be provided as arguement. e.g. npm run updateProgress:tasks -- id=1 progress=2",
      );
      return;
    }

    if (!args[1]?.startsWith("progress=")) {
      console.log(
        "Task should be provided as arguement. e.g. npm run updateProgress:tasks -- id=1 progress=2",
      );
      return;
    }
    const id: number = parseInt(args[0].replace("id=", ""));
    const progress: number = parseInt(args[1].replace("progress=", ""));

    const task = tasks.payload.find((each) => each.id === `${id}`);
    if (!task) {
      console.log("Task not found. Give valid id");
      return;
    }
    switch (progress) {
      case 1:
        task.progress = "To Do";
        break;
      case 2:
        task.progress = "In Progress";
        break;
      case 3:
        task.progress = "Completed";
        break;
      default:
        console.log("Invalid Input. Valid values for progress = 1 | 2 | 3");
        return;
    }
    updateJSON(tasks);

    console.log(`Task ${task.id} was updated`);
  },

  "delete:tasks": async (args) => {
    const tasks: TaskResponseJSON = await fetchJSON();
    if (!args) {
      console.log(
        "Task should be provided as arguement. e.g. npm run delete:tasks -- id=1",
      );
      return;
    }

    if (!args[0]?.startsWith("id=")) {
      console.log(
        "Task should be provided as arguement. e.g. npm run delete:tasks -- id=1",
      );
      return;
    }
    const id: number = parseInt(args[0].replace("id=", ""));

    if (!id) {
      console.log("Enter valid input.");
      return;
    }

    const updatedTasks: TaskResponseJSON = {
      payload: [...tasks.payload.filter((each) => each.id !== `${id}`)],
      _id: tasks._id,
    };

    updateJSON(updatedTasks);

    console.log(`Task ${id} deleted.`);
  },
};

function init() {
  const args = (process.argv as Array<string>).slice(2);
  switch (args[0]) {
    case "view:tasks":
      commandFunc[args[0]]?.();
      break;
    default:
    const func: ((args: string[]) => void) | undefined = commandFunc[args[0] || ''];
      if (!func) {
        return;
      }
      func(args.slice(1));
      break;
  }
}

init();