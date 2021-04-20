import { Sequelize } from 'sequelize';

/**
 * Wrapper to manage DB connection
 */
export class DB {
  sequelize: Sequelize;

  constructor() {
    let host = process.env.PGHOST;
    let user = process.env.PGUSER;
    let pass = process.env.PGPASSWORD;
    let dbname = process.env.PGDATABASE;
    this.sequelize = new Sequelize(`postgres://${user}:${pass}@${host}:5432/${dbname}`);
  }

  async connect() {
    await this.sequelize.authenticate();
  }
}
