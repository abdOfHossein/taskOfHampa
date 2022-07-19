import { join } from 'path';

const config = require('dotenv').config(join(__dirname, '../.env'));
const secret = process.env.JWT_SECRET_KEY;

console.log(secret);

export const jwtConstants = {
  secret,
};
console.log(jwtConstants.secret);
