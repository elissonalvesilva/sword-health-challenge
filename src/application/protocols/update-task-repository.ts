import { Task } from "domain/protocols";

export interface UpdateTaskRepository {
  updateTask(id: string, task: Task): Promise<boolean>
}
