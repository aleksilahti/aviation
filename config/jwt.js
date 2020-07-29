const dotenv = require('dotenv');

dotenv.config();

const secret = process.env.JWT_SECRET || 'keyboard cat';
module.exports.secret = secret;