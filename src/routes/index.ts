import { AuthRoutes } from "@/modules/Auth/auth.route";
import { TaskRoutes } from "@/modules/Task/task.route";
import { Router } from "express";

const router = Router();

router.use("/tasks", TaskRoutes);

router.use("/auth", AuthRoutes);

export const IndexRouter: Router = router;
