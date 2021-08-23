const Joi = require('joi');
const adminSchema = Joi.object({
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

});


module.exports = {adminSchema}