import { Router } from "express";
import{
    handleAssignTicket,
    handleCreateTicket,
    handleDeleteTicket,
    handleListTickets,
    handleUpdateStatus,
    handleViewTicket,
} from "./controller.ts";

const router = Router();
router.get("/", handleListTickets);
router.post("/", handleCreateTicket);
router.get("/:id", handleViewTicket);
router.patch("/:id/status", handleUpdateStatus);
router.patch("/:id/assignee", handleAssignTicket);
router.delete("/:id", handleDeleteTicket);
export default router;
