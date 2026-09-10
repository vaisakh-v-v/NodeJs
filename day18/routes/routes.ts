import { Router } from "express";
import {
  handleAssignTicket,
  handleCreateTicket,
  handleDeleteTicket,
  handleListTickets,
  handleUpdateStatus,
  handleViewTicket,
} from "../controller/ticket.ts";
import { authenticateToken, permit, permitAll } from "../middleware/auth.ts";

const tickets = Router();

tickets.use(authenticateToken);
tickets.get("/", permitAll(), handleListTickets);
tickets.post("/:id", permitAll(), handleViewTicket);

tickets.patch(
  "/:id/status",
  permit(["administrator", "agent"]),
  handleUpdateStatus,
);

tickets.patch("/:id/assignee", permit(["administrator"]), handleAssignTicket);
tickets.delete("/:id", permit(["administrator"]), handleDeleteTicket);

export default tickets;

