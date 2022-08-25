import { Sequelize } from 'sequelize';

export const database = new Sequelize(
  process.env.DATABASE_NAME!,
  process.env.DATABASE_USER!,
  process.env.DATABASE_PASS!,
  {
    dialect: 'mysql',
    host: process.env.DATABASE_HOST!,
    port: +process.env.DATABASE_PORT!,
  },
);

export default async function autenticate() {
  try {
    await database.authenticate();
  } catch (error) {
    throw new Error('can connect to database');
  }
}
