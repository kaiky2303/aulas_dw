const pg = require('pg');

const pool = new pg.Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'ifc',
  database: 'login_jwt',
  port: 5432,
});

module.exports = pool;