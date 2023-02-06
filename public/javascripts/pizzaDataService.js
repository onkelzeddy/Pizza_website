const pool = require('./pizzaDataBase')
const queries = require('./pizzaQueries')


function getPizzaData() {
    return pool.query(queries.getPizzaData)
    .then((res) => {return (res.rows)})
    .catch((err) => console.error(err))
}

const getPizzaById = (req,res) => {
    pool.query(queries.getPizzaById,[req.query['id']],(error,pizzaResults)=>{
        if(error) throw error;
        pool.query(queries.getDopsForPizzaById,[req.query['id']],(error,dopsResults)=>{
            if(error) throw error;
            res.render('../views/modal',{pizzaData: pizzaResults.rows , dopsData: dopsResults.rows});
        })
    });
};

module.exports = {
    getPizzaData,
    getPizzaById
};