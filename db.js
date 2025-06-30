// db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'library_db',  // <-- вот она
  password: '1234',
  port: 5432,
});

module.exports = pool;
