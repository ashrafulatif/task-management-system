// task.service.ts
import { prisma } from "@/lib/prisma";
import { TaskStatus } from "../../../generated/prisma/enums";
import { CreateTaskPayload, UpdateTaskPayload } from "./task.interface";
import { Prisma } from "../../../generated/prisma/client";

const parseAndValidateFutureDate = (value: string | Date) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new Error("Invalid due date");
  }
  if (date <= new Date()) {
    throw new Error("Due date must be a future date");
  }
  return date;
};

const createTask = async (payload: CreateTaskPayload & { userId: string }) => {
  const dueDate = parseAndValidateFutureDate(payload.dueDate);

  return prisma.task.create({
    data: {
      title: payload.title,
      description: payload.description,
      dueDate,
      status: payload.status ?? TaskStatus.PENDING,
      userId: payload.userId,
    },
  });
};

const getUserAllTasks = async (payload: {
  searchString?: string;
  status?: TaskStatus;
  userId: string;
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: string;
}) => {
  const andConditions: Prisma.TaskWhereInput[] = [];

  andConditions.push({
    userId: payload.userId,
  });

  if (payload.searchString) {
    andConditions.push({
      OR: [
        {
          title: {
            contains: payload.searchString,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: payload.searchString,
            mode: "insensitive",
          },
        },
      ],
    });
  }

  if (payload.status) {
    andConditions.push({
      status: payload.status,
    });
  }

  const allowedSortFields = [
    "createdAt",
    "updatedAt",
    "dueDate",
    "title",
    "status",
  ];
  const safeSortBy = allowedSortFields.includes(payload.sortBy)
    ? payload.sortBy
    : "createdAt";
  const safeSortOrder: Prisma.SortOrder =
    payload.sortOrder === "asc" ? "asc" : "desc";

  const result = await prisma.task.findMany({
    take: payload.limit,
    skip: payload.skip,
    where: {
      AND: andConditions,
    },
    orderBy: {
      [safeSortBy]: safeSortOrder,
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
    },
  });

  const total = await prisma.task.count({
    where: {
      AND: andConditions,
    },
  });

  return {
    data: result,
    meta: {
      page: payload.page,
      limit: payload.limit,
      total,
      totalPages: Math.ceil(total / payload.limit),
    },
  };
};

const getTaskById = async (id: string, userId: string) => {
  const result = await prisma.task.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
    },
  });
  if (!result) {
    throw new Error("Task not found");
  }
  if (result.userId !== userId) {
    throw new Error("Unauthorized to access this task");
  }

  return result;
};

const updateTask = async (
  id: string,
  payload: UpdateTaskPayload,
  userId: string,
) => {
  const existingTask = await prisma.task.findUnique({
    where: {
      id,
    },
  });

  if (payload.dueDate) {
    payload.dueDate = parseAndValidateFutureDate(payload.dueDate);
  }

  if (!existingTask) {
    throw new Error("Task not found");
  }
  //check if the task belongs to the user
  if (existingTask.userId !== userId) {
    throw new Error("Unauthorized to update this task");
  }

  return prisma.task.update({
    where: { id: existingTask.id },
    data: payload,
  });
};

const deleteTask = async (id: string, userId: string) => {
  const existingTask = await prisma.task.findUnique({
    where: {
      id,
    },
  });

  if (!existingTask) {
    throw new Error("Task not found");
  }

  //check if the task belongs to the user
  if (existingTask.userId !== userId) {
    throw new Error("Unauthorized to delete this task");
  }

  return prisma.task.delete({
    where: { id: existingTask.id },
  });
};

export const TaskService = {
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
  getUserAllTasks,
};
