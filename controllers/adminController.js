const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const maxAge = 60*60*24*30 //1Ay

const createToken = (id) => {
    return jwt.sign({id}, process.env.SECRET_WORD, { expiresIn: maxAge })
}

const signup_get = (req, res) => {
    res.render('signup')
}

const signup_post = (req, res) => {
    if (req.body.password == req.body.repeat_password) {
        const user = new User(req.body)
        user.save().then(res.redirect('/login'))
    }
    else {
        console.log('Passwords are not the same')
    }
}

const login_get = (req, res) => {
    res.render('login')
}

const login_post = async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    if (user) {
        let pass = await bcrypt.compare(password, user.password)
        if (pass) {
            const token = createToken(user._id)
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge*1000 })
            res.redirect('/')
        }
        else {
            console.log('Wrong password!');
        }
    }
    else {
        console.log('User not found!');
    }
}



module.exports = { signup_get, login_get, signup_post, login_post }