import type { Request } from "express";

export interface Ticket {
  ticket_id?: string;
  title: string;
  description: string;
  category_id: Category;
  priority: Priority;
  status: Status;
  assignee?: string;
  customer: string;
}

export type RequestBodyTicket = Omit<
  Ticket,
  "ticketId" | "status" | "assignee"
>;

export interface TicketJSON {
  payload: Ticket[];
}

export const categories = {
  1: "Billing & Payments",
  2: "Technical Support & Bugs",
  3: "Account & Access Management",
  4: "General Inquiries",
  5: "Feature Requests",
};

export type Category = keyof typeof categories;

export type Priority = "low" | "medium" | "high";

export type Status = "pending" | "complete";

export interface Message {
  message: string;
}

export class HTTPError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export interface QueryOptions {
  page: number;
  pageSize: number;
  status: string;
  priority: string;
  assignee: string;
  search: string;
  sortField: string;
  sortDirection: "asc" | "desc";
}

export interface User{
  user_id: number;
  name: string;
  email: string; 
  hashed_password: string;
  role: "administrator" | "agent" | "customer";
}

export interface AuthRequest extends Request{
  user?: Omit<User, "hashed_password">;
}