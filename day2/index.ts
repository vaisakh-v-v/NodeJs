import process from "node:process"
import {readFile, writeFile} from "node:fs/promises";

type Task = {
    id: string;
    content: string;
    progress: "To Do" | "Progress" | "Completed";
};

type TaskResponsesJSON = {
    payload: Task[];
    _id: number;
};

const fetchJSON = async () => {
    payload: Task[];
    _id: Number;
};
