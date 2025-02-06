const sql = require("mssql");
require("dotenv").config();

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: false, // Set to true if using Azure SQL
    trustServerCertificate: true, // Required for self-signed certs
  },
};

const poolPromise = new sql.ConnectionPool(dbConfig)
  .connect()
  .then(pool => {
    console.log("Connected to MSSQL Database".bgCyan.white);
    return pool;
  })
  .catch(err => {
    console.error("Database connection failed:", err);
    process.exit(1);
  });

module.exports = { sql, poolPromise };
