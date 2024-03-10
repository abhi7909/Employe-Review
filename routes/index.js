const express = require('express');
const router = express.Router();
const passport = require('passport');

//controllers
const homepageController = require('../controllers/homepage_controllers');
const employeeController = require('../controllers/employee_controllers')

//other route files
const userRoutes = require('./user');

// signin | signup | home routes
router.get('/', homepageController.renderHomePage);
router.get('/signin', homepageController.renderSignInPage);
router.get('/signup', homepageController.renderSignUpPage);
router.get('/create-company', homepageController.renderCreateCompanyPage);

// form submission
router.post('/create-company', employeeController.createCompany);
router.post('/create-employee', employeeController.createEmployee);
router.post('/signin', passport.authenticate('local', {
    successRedirect: '/user/employee',
    failureRedirect: '/signup'
}));

// user logout route
router.get('/signout', passport.checkAuthentication, employeeController.singout);


router.use('/user', userRoutes); // seperating /user routes to different file

module.exports = router;