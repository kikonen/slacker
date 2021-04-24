import { Sequelize, QueryTypes } from 'sequelize';

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

  static async nextID() {
    const rs: any = await this.sequelize.query("select gen_random_uuid() as id", { plain: true, raw: true, type: QueryTypes.SELECT });
    const id = rs.id;
    console.log(`NEXT_ID: ${id}`);
    return id;
  }
}

DB.init();
