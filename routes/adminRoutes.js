const router = require('express').Router()
const adminController = require('../controllers/adminController')

router.get('/signup', adminController.signup_get)
router.post('/signup', adminController.signup_post)
router.get('/login', adminController.login_get)
router.post('/login', adminController.login_post)

module.exports = router