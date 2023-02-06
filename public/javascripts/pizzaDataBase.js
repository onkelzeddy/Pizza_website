const Pool = require("pg").Pool;
const pizzaPool = new Pool({
user: "onkelzeddy",
host: "localhost",
database: "pizza_db",
password: "1703",
port: 5432,
});
module.exports = pizzaPool;
