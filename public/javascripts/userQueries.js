const getUserData = "SELECT * FROM users";
const getUserById = "SELECT * FROM users WHERE id = $1";
const getUserByName = "SELECT * FROM users WHERE name = $1";
const getUserByEmail = "SELECT * FROM users WHERE email = $1";
const getMaxId = "SELECT MAX(id) FROM users";
const createOrder = "INSERT INTO orders(id,\"userName\",\"phoneNumber\",adr,\"pizzaId\",\"dopsId\",price,date) VALUES (NEXTVAL('id_seq'),$1,$2,$3,$4,$5,$6,current_timestamp)"

module.exports ={
    getUserData,
    getUserById,
    getUserByName,
    getUserByEmail,
    getMaxId,
    createOrder
};