import { Router } from "express";
import {
  handleAssignTicket,
  handleCreateTicket,
  handleDeleteTicket,
  handleListTickets,
  handleUpdateStatus,
  handleViewTicket,
} from "../controller/ticket.ts";


const tickets = Router();

tickets.get("/", handleListTickets);

tickets.post("/", handleCreateTicket);

tickets.get("/:id", handleViewTicket);

tickets.patch("/:id/status", handleUpdateStatus);

tickets.patch("/:id/assignee", handleAssignTicket);

tickets.delete("/:id", handleDeleteTicket);

export default tickets;
