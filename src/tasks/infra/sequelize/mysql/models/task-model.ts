import {
  Model,
  Optional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import { database } from '@/tasks/infra/sequelize/mysql/config/database';

export class TaskModel extends Model<
  InferAttributes<TaskModel>,
  InferCreationAttributes<TaskModel>
> {
  declare id: CreationOptional<string>;
  declare resume: string;
  declare user_id: string;
}

TaskModel.init(
  {
    id: {
      type: DataTypes.STRING,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    resume: {
      type: DataTypes.STRING(2500),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: 'tasks',
    sequelize: database,
  },
);
