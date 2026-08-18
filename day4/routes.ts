import { Router } from "express";
import{
    handleAddTasks,
    handleGetTask,
    handleGetTasks,
    handleUpdateTask,
    handleDeleteTask,
} from "./controller.ts";
const router = Router();
router.get("/", handleGetTasks);
router.post("/", handleAddTasks);
router.get("/:id", handleGetTask);
router.patch("/:id", handleUpdateTask);
router.delete("/:id", handleDeleteTask);
export default router;
