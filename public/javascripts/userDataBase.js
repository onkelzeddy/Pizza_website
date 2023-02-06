const Pool = require("pg").Pool;
const userPool = new Pool({
user: "onkelzeddy",
host: "localhost",
database: "user_db",
password: "1703",
port: 5432,
});
module.exports = userPool;