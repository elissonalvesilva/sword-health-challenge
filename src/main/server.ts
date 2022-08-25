import 'module-alias/register';
import dotenv from 'dotenv';
dotenv.config();

import autenticate from '@/infra/sequelize/mysql/config/database';

autenticate()
  .then(async () => {
    const app = (await import('./app')).default;
    app.listen(process.env.PORT, () =>
      console.log(`ToDO API running at http://localhost:${process.env.PORT}`),
    );
  })
  .catch(console.error);
