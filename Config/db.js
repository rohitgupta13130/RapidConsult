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

// Creating a connection pool with error handling
const poolPromise = new sql.ConnectionPool(dbConfig)
  .connect()
  .then(pool => {
    console.log("✅ Connected to MSSQL Database".bgCyan.white);
    return pool;
  })
  .catch(err => {
    console.error("❌ Database connection failed:", err.message);
    setTimeout(() => process.exit(1), 5000); // Retry mechanism instead of immediate exit
  });

module.exports = { sql, poolPromise };
