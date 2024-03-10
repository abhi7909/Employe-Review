const express = require('express');
const router = express.Router();
const passport = require('passport');

const employeeController = require('../controllers/employee_controllers');


/**
 * passport.checkAuthentication is custom middleware used to check
 * wether user is logged in or not 
 * if user is not logged in this middleware redirect user to login page
 */

// employee convert routes 
router.post('/make-admin', passport.checkAuthentication, employeeController.makeAdmin); // convert employee ->  admin
router.post('/make-employee', passport.checkAuthentication, employeeController.makeEmployee); // convert admin -> employee


// employee view rendaring
router.get('/admin', passport.checkAuthentication, employeeController.adminPanel); // render admin view
router.get('/employee-review/:id', passport.checkAuthentication, employeeController.employeeReview); // render employee review (admin-panel -> employee review)
router.get('/employee', passport.checkAuthentication, employeeController.employeeView); // render employee view

// feedback controls
router.post('/ask-feedback', passport.checkAuthentication, employeeController.askFeedback);
router.post('/cancel-feedback', passport.checkAuthentication, employeeController.cancelFeedback);
router.post('/submit-feedback', passport.checkAuthentication, employeeController.submitFeedback);

// delete user route
router.delete('/employee', passport.checkAuthentication, employeeController.deleteEmployee);

module.exports = router;