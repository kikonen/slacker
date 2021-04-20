import { Sequelize } from 'sequelize';

/**
 * Wrapper to manage DB connection
 */
export class DB {
  static sequelize: Sequelize;

  static init() {
    if (this.sequelize) return;

    let host = process.env.PGHOST;
    let user = process.env.PGUSER;
    let pass = process.env.PGPASSWORD;
    let dbname = process.env.PGDATABASE;

    let conn_uri = `postgres://${user}:${pass}@${host}:5432/${dbname}`
    console.log(conn_uri);
    this.sequelize = new Sequelize(conn_uri);
  }

  static async connect() {
    await this.sequelize.authenticate();
  }
}

DB.init();
