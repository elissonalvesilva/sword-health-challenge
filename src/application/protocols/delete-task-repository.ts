export interface DeleteTaskRepository {
  deleteTask(id: string): Promise<boolean>;
}
