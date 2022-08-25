import {
  AddTaskRepository,
  GetTaskRepository,
  UpdateTaskRepository,
  DeleteTaskRepository,
} from '@/tasks/application/protocols';
import { Task } from '@/tasks/domain/protocols';
import { TaskModel } from '@/tasks/infra/sequelize/mysql/models/task-model';

export class TaskImplementation
  implements
    AddTaskRepository,
    UpdateTaskRepository,
    GetTaskRepository,
    DeleteTaskRepository
{
  async addTask(task: Task): Promise<boolean> {
    try {
      await TaskModel.create({
        resume: task.resume,
        user_id: task.user_id,
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async updateTask(id: string, task: Task): Promise<boolean> {
    try {
      const afectedCount = await TaskModel.update(
        {
          resume: task.resume,
        },
        { where: { id: id } },
      );
      if (!afectedCount) {
        return false;
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  async getAllTasks(): Promise<Task[]> {
    const tasks = await TaskModel.findAll();
    return tasks;
  }
  async getTaskById(id: string): Promise<Task> {
    let response: Task = {
      resume: '',
      user_id: '',
    };
    try {
      const task = await TaskModel.findByPk(id);
      if (task) {
        response = task;
      }
      return response;
    } catch (error) {
      console.error(error);
      return response;
    }
  }

  async deleteTask(id: string): Promise<boolean> {
    try {
      const deletedTask = await TaskModel.destroy({ where: { id: id } });
      if (deletedTask) {
        return Promise.resolve(true);
      }
      return Promise.resolve(false);
    } catch (error) {
      console.error(error);
      return Promise.resolve(false);
    }
  }
}
