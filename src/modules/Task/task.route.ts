import express from "express";
import { TaskController } from "./task.controller";
import authMiddileware from "@/middlewares/authMiddleware";
import { UserRole } from "@/types/enums/UserRole";

const router = express.Router();

router.post(
  "/add-task",
  authMiddileware(UserRole.USER, UserRole.ADMIN),
  TaskController.createTask,
);

router.get(
  "/my-tasks",
  authMiddileware(UserRole.USER, UserRole.ADMIN),
  TaskController.getUserAllTasks,
);

router.get(
  "/:id",
  authMiddileware(UserRole.USER, UserRole.ADMIN),
  TaskController.getTaskById,
);

router.put(
  "/:id",
  authMiddileware(UserRole.USER, UserRole.ADMIN),
  TaskController.updateTask,
);

router.delete(
  "/:id",
  authMiddileware(UserRole.USER, UserRole.ADMIN),
  TaskController.deleteTask,
);

export const TaskRoutes = router;
