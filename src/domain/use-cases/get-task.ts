import { Task } from "domain/protocols/task";

export interface GetTask {
  getAll(): Promise<Task[]>
  get(id: string): Promise<Task>
}
