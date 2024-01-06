const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = (req, res, next) => {
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token, process.env.SECRET_WORD, (error) => {
            if(error){
                console.log(error.message);
            }
            else{
                next()
            }
        })
    }
    else{
        res.redirect('/login')
    }
}



module.exports = { auth }