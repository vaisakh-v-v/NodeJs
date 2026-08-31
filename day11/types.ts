export interface Ticket{
    ticket_id?: string;
    title: string;
    description: string;
    category_id: Category;
    priority:Priority;
    status: Status;
    assignee?:string;
    customer: string;
}

export type RequestBodyTicket = Omit<Ticket, "ticketId" | "status" | "assignee">;

export interface TicketJSON{
    payload: Ticket[];
}

export const categories = {
    1: "Billing & Payments",
    2: "Techinical Support & Bugs",
    3: "Account & Access Management",
    4: "General Inquiries",
    5:"Feature Requests",
}

export type Category = keyof typeof categories;

export type Priority = "low" | "medium" | "high";
export type Status = "pending" | "complete";

export interface Message{
    message: string;

}

export class HTTPError extends Error{
    statusCode: number;
    constructor(message: string, statusCode: number){
        super(message);
        this.statusCode = statusCode;
    }
}
