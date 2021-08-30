// getting router from the express package
const { Router } = require('express');
const authController = require('../controllers/authController');

// instance of the router
const router = Router();

router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);
router.get('/login', authController.login_get);
router.post('/login', authController.login_post);

// router.get('/signup', () => {});

module.exports = router;
