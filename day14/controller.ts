import { type Request, type Response } from "express";
import {
  HTTPError,
  RequestBodyTicket,
  Ticket,
  Status,
  QueryOptions,
} from "./types";
import {
  addTicket,
  deleteTicket,
  getTickets,
  getTicket,
  updateAssignee,
  updateStatus,
} from "./database/ticket";

export async function handleListTickets(req: Request, res: Response) {
  const options = req.query;
  const typeSafeOptions: QueryOptions = {
    page: options.page ? parseInt(options.page as string) : 0,
    pageSize: options.pageSize ? parseInt(options.pageSize as string) : 30,
    status: options.status as string,
    priority: options.priority as string,
    assignee: options.assignee as string,
    search: options.search as string,
    sortField: (options.sortField as string) ?? "ticket_id",
    sortDirection:
      options.sortDirection && options.sortDirection === "desc"
        ? "desc"
        : "asc",
  };
  const data = await getTickets(typeSafeOptions);
  res.json(data);
}

export async function handleCreateTicket(req: Request, res: Response) {
  const requestBody: RequestBodyTicket = req.body;

  if (!requestBody) {
    throw new HTTPError("Invalid Input", 400);
  }

  if (!requestBody.title) {
    throw new HTTPError("Title not found", 400);
  }

  if (!requestBody.description) {
    throw new HTTPError("Desciption not found", 400);
  }

  if (!requestBody.priority) {
    throw new HTTPError("Priority not found", 400);
  }

  if (!requestBody.category_id) {
    throw new HTTPError("Category not found", 400);
  }

  if (!requestBody.customer) {
    throw new HTTPError("Customer name not found", 400);
  }

  const ticket: Ticket = {
    title: requestBody.title,
    description: requestBody.description,
    priority: requestBody.priority,
    category_id: requestBody.category_id,
    status: "pending",
    customer: requestBody.customer,
  };

  const values = await addTicket(ticket);

  res.json({ message: `Ticket of id: ${values.ticket_id} was added` });
}

export async function handleViewTicket(
  req: Request<{ id: string }>,
  res: Response,
) {
  const idString = req.params.id;
  const id = parseInt(idString);
  if (!id) {
    throw new HTTPError("Page not found", 404);
  }
  const ticket = await getTicket(id);

  if (!ticket) {
    throw new HTTPError("Page not found", 404);
  }

  res.json(ticket);
}

export async function handleUpdateStatus(
  req: Request<{ id: string }>,
  res: Response,
) {
  const idString = req.params.id;
  const body: { status: Status } = req.body;
  if (!body) {
    throw new HTTPError("Invalid input", 400);
  }
  if (!body.status) {
    throw new HTTPError("Invalid input", 400);
  }
  const id = parseInt(idString);
  if (!id) {
    throw new HTTPError("Page not found", 404);
  }

  const result = await updateStatus(id, body.status);

  res.json({ message: `Ticket of id: ${result.ticket_id} was updated` });
}

export async function handleAssignTicket(
  req: Request<{ id: string }>,
  res: Response,
) {
  const idString = req.params.id;
  const body: { assignee: string } = req.body;
  if (!body) {
    throw new HTTPError("Invalid input", 400);
  }
  if (!body.assignee) {
    throw new HTTPError("Invalid input", 400);
  }
  const id = parseInt(idString);
  if (!id) {
    throw new HTTPError("Page not found", 404);
  }

  const result = await updateAssignee(id, body.assignee);

  res.json({ message: `Ticket of id: ${result.ticket_id} was updated` });
}

export async function handleDeleteTicket(
  req: Request<{ id: string }>,
  res: Response,
) {
  const idString = req.params.id;
  const id = parseInt(idString);
  if (!id) {
    throw new HTTPError("Page not found", 404);
  }

  const result = await deleteTicket(id);

  res.json({ message: `Ticket of id: ${result.ticket_id} was deleted` });
}