const pool = require('./userDataBase')
const queries = require('./userQueries')
const jwt = require('jsonwebtoken');


async function login(userLogin, userPassword){
    const crypto = require('crypto')

    var user = await (await pool.query(queries.getUserByEmail,[userLogin])).rows
    
    if(user.length == 0)return {status:"Пользователя с логином \"" + userLogin + "\" не существует."};

    var hash = crypto.pbkdf2Sync(userPassword,await user[0]["salt"] , 1000 , 64 , 'sha512').toString('hex');

    if(await user[0]['hash'] == hash){
        newToken = jwt.sign( user[0]["name"], process.env.TOKEN_SECRET)
        return {status:"OK",token: newToken}
    }
    else{
        return {status:"Неверный логин или пароль."}
    }


}



function registration(userName,userLogin,userPassword){
    const crypto = require('crypto')

    var salt = crypto.randomBytes(16).toString('hex')

    var hash = crypto.pbkdf2Sync(userPassword, salt , 1000 , 64 , 'sha512').toString('hex')

}

const createOrder =  (req,res) => { 
    console.log(req.body);
    pool.query(queries.createOrder,[req.body.userName,req.body.phoneNumber,req.body.adr,req.body.pizzaId,req.body.dopsId,req.body.price])
    .then(() => res.send({status:"OK"}))
    .catch((err) => {
        res.send({status:"Что-то пошло не так!"});
        console.error(err);})


}

module.exports = {
    login,
    registration,
    createOrder
};