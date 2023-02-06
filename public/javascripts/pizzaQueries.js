const getPizzaData = "SELECT * FROM pizza";
const getPizzaById = "SELECT * FROM pizza WHERE id = $1";
const getDopsForPizzaById = "SELECT * FROM dops WHERE pizza_id = $1";

module.exports ={
    getPizzaData,
    getPizzaById,
    getDopsForPizzaById
};