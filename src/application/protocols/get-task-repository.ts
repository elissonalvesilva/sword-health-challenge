import { Task } from "domain/protocols";

export interface GetTaskRepository {
  getAllTasks(): Promise<Task[]>;
  getTaskById(id: string): Promise<Task>;
}
