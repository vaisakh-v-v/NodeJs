import {type QueryResult } from "pg";
import { HTTPError,type Status,type Ticket } from "../types.ts";
import { client } from "./init.ts"


export async function getAllTickets() {
    const dbResponse = await client.query("select * from ticket_system.tickets");
    return dbResponse.rows;
}

export async function addTicket(ticket:Ticket) {
    try{
        const query = `insert into ticket_system.tickets(
        title, description, priority, status, category_id, customer)
        values($1, $2, $3, $4, $5, $6)
        returning *`;

        const values = [ticket.title, ticket.description, ticket.priority, ticket.status, ticket.category_id, ticket.customer];

        const dbResponse = await client.query(query, values);
        return dbResponse.rows;
    } catch (err) {
        throw new HTTPError((err as Error).message, 400);
    }
}

export async function getTicket(id: number) {
    const dbResponse = await client.query("select * from ticket_system.tickets where ticket_id = $1", [id],);
    if(!dbResponse.rows.length){
        throw new HTTPError("Page not found", 404);
    }
    return dbResponse.rows[0];
}

export async function updateStatus(id: number, status: Status){
    const query = `
    update ticket_system.tickets,
    set status = $1,
    where ticket_id = $2,
    returning *
    `;
    const values = [status, id];
    let dbResponse: QueryResult;
    try{
        dbResponse = await client.query(query, values);
    }catch (err) {
        throw new HTTPError((err as Error).message, 400);
    }

    if(!dbResponse.rows.length){
        throw new HTTPError("page not found", 404);
    }

    return dbResponse.rows[0];
}

export async function updateAssignee(id: number, assignee: string) {
  const query = `
    update ticket_system.tickets
    set assignee = $1
    where ticket_id = $2
    returning *
  `;
  const values = [assignee, id];

  let dbResponse: QueryResult;

  try {
    dbResponse = await client.query(query, values);
  } catch (err) {
    throw new HTTPError((err as Error).message, 400);
  }

  if (!dbResponse.rows.length) {
    throw new HTTPError("Page not found", 404);
  }

  return dbResponse.rows[0];
}


export async function deleteTicket(id: number) {
    const query = `
    delete from ticket_system.tickets
    where ticket_id = $1
    returning *
    `;
    const values = [id];
    let dbResponse: QueryResult;
    try{
        dbResponse = await client.query(query, values);
    }catch (err) {
        throw new HTTPError((err as Error).message, 400);
    }

    if(!dbResponse.rows.length){
        throw new HTTPError("page not found", 404);
    }

    return dbResponse.rows[0];
}