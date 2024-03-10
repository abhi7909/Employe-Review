/**
 * company schema to store compnay information
 * 1. name of company, 
 * 2. company description  
 * 3. array of ObjectIds of user (employees of company)
 */

const mongoose = require('mongoose');

companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    employees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, { timestamps: true });


const Company = mongoose.model('Company', companySchema);

module.exports = Company;