import { TaskStatus } from "../../../generated/prisma/enums";

export interface CreateTaskPayload {
  title: string;
  description?: string;
  dueDate: Date | string;
  status?: TaskStatus;
  userId: string;
}

export interface UpdateTaskPayload {
  title?: string;
  description?: string;
  dueDate?: Date | string;
  status?: TaskStatus;
  completedAt?: Date | string | null;
}
