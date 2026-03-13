import { catchAsync } from "@/shared/catchAsync";
import { Request, Response } from "express";
import { sendResponse } from "@/shared/sendResponse";
import httpStatus from "http-status";
import { TaskService } from "./task.service";
import paginationAndSortgHelper from "@/utils/paginationAndSorting";
import { TaskStatus } from "../../../generated/prisma/enums";

const createTask = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const userId = req.user?.id;

  if (!userId) {
    throw new Error("User not authenticated");
  }
  const result = await TaskService.createTask({ ...payload, userId });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Task created successfully",
    data: result,
  });
});

const getUserAllTasks = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;

  const { search, status } = req.query;

  const searchString = typeof search === "string" ? search : undefined;
  const statusValue =
    typeof status === "string" ? status.toUpperCase() : undefined;
  //pagination
  const { page, limit, skip, sortBy, sortOrder } = paginationAndSortgHelper(
    req.query,
  );

  const result = await TaskService.getUserAllTasks({
    userId: userId as string,
    searchString,
    status: statusValue as TaskStatus | undefined,
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Tasks retrieved successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getTaskById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.id;
  const result = await TaskService.getTaskById(id as string, userId as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Task retrieved successfully",
    data: result,
  });
});

const updateTask = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const userId = req.user?.id;
  const result = await TaskService.updateTask(
    id as string,
    payload,
    userId as string,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Task updated successfully",
    data: result,
  });
});

const deleteTask = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.id;
  const result = await TaskService.deleteTask(id as string, userId as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Task deleted successfully",
    data: result,
  });
});

export const TaskController = {
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
  getUserAllTasks,
};
