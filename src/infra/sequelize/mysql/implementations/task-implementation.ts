import {
  AddTaskRepository,
  GetTaskRepository,
  UpdateTaskRepository,
} from '@/application/protocols';
import { Task } from '@/domain/protocols';
import { TaskModel } from '@/infra/sequelize/mysql/models/task-model';

export class TaskImplementation
  implements AddTaskRepository, UpdateTaskRepository, GetTaskRepository
{
  async addTask(task: Task): Promise<boolean> {
    try {
      await TaskModel.create({
        resume: task.resume,
        user_id: 'asda',
      });
      return true;
    } catch (error) {
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
      return false;
    }
  }
  async getAllTasks(): Promise<Task[]> {
    const tasks = await TaskModel.findAll();
    return tasks;
  }
  async getTaskById(id: string): Promise<Task> {
    const task = await TaskModel.findByPk(id);
    let response: Task = {
      resume: '',
    };

    if (task) {
      response = task;
    }

    return response;
  }
}
