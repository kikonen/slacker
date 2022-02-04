import { Sequelize, QueryTypes } from 'sequelize';

/**
 * Wrapper to manage DB connection
 */
export class DB {
  static sequelize: Sequelize;

  static init() {
    if (this.sequelize) return;

    let host = process.env.DB_HOST;
    let user = process.env.DB_USER;
    let pass = process.env.DB_PASSWORD;
    let dbname = process.env.DB_NAME

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
