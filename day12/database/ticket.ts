import { HTTPError, type Status,type Ticket } from "../types.ts";
import prisma from "./init.ts";

export async function getAllTicktets() {
  const dbResponse = await prisma.tickets.findMany();
  return dbResponse;
}

export async function addTicket(ticket: Ticket) {
  try {
    const newTicket = await prisma.tickets.create({
      data: {
        title: ticket.title,
        description: ticket.description,
        priority: ticket.priority,
        status: ticket.status,
        category_id: ticket.category_id,
        customer: ticket.customer,
      },
    });
    return newTicket;
  } catch (err) {
    throw new HTTPError((err as Error).message, 400);
  }
}

export async function getTicket(id: number) {
  try {
    const ticket = await prisma.tickets.findFirst({
      where: {
        ticket_id: id,
      },
    });
    return ticket;
  } catch (err) {
    throw new HTTPError((err as Error).message, 400);
  }
}

export async function updateStatus(id: number, status: Status) {
  try {
    const ticket = await prisma.tickets.update({
      where: {
        ticket_id: id,
      },
      data: {
        status: status,
      },
    });
    return ticket;
  } catch (err) {
    throw new HTTPError((err as Error).message, 400);
  }
}

export async function updateAssignee(id: number, assignee: string) {
  try {
    const ticket = await prisma.tickets.update({
      where: {
        ticket_id: id,
      },
      data: {
        assignee: assignee,
      },
    });
    return ticket;
  } catch (err) {
    throw new HTTPError((err as Error).message, 400);
  }
}

export async function deleteTicket(id: number) {
  try {
    const ticket = await prisma.tickets.delete({
      where: {
        ticket_id: id,
      },
    });
    return ticket;
  } catch (err) {
    throw new HTTPError((err as Error).message, 400);
  }
}