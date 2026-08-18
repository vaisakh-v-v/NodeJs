export type Task = {
    id: number;
    content: string;
    progress: "To Do" | "In Progress" | "Completed";
};

export type TaskResponseJSON = {
    payload: Task[];
    _id: number;
}
export interface Message{
    message: string;
}

export type Method = "GET" | "POST" | "PATCH" | "DELETE";

export class HTTPError extends Error{
    statusCode: number;
    constructor(message: string, statuscode: number){
        super(message);
        this.statusCode = statuscode;
    }
}