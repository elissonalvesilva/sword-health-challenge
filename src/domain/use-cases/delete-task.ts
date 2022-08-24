export interface DeleteTask {
  delete(id: string): Promise<boolean>;
}
