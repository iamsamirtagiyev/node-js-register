const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const adminRoutes = require('./routes/adminRoutes')
const { auth } = require('./middlewares/authMiddleware')

const app = express()
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
dotenv.config()

const port = process.env.PORT || 3000

mongoose.connect(process.env.DB).then(() => app.listen(port))

app.get('/', auth, (req, res) => {
    res.render('index')
})

app.use(adminRoutes)