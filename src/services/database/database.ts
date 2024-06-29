import { Client, QueryConfig } from 'pg';

// type QueryConfig = Pick<Submittable, 'name' | 'text' | 'values'>;

class DatabaseService {
  private _client;

  private _config = {
    user: 'postgres',
    password: 'postgres',
    host: process.env.DB_HOST ?? 'localhost',
    port: parseInt(process.env.DB_PORT ?? '18080'),
    application_name: 'tech test'
  };

  constructor() {
    this._client = new Client(this._config);

    this.connect();
  }

  async connect() {
    this._client.connect();
  }

  async test() {
    try {
      console.debug('running default test query');
      const res = await this._client.query("SELECT 'PostGreSQL up and running' result");
      console.debug(res.rows.at(0).result);
    } catch(e) {
      console.error(e);
    }
  }

  query(stream : QueryConfig) {
    return this._client.query(stream);
  }
}

Object.freeze(DatabaseService);
export default new DatabaseService();