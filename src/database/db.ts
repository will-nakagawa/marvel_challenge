/**
* File Name : db.ts
*/

import Knex from "knex";
const config = require('../knexfile');

const HAPI_ENV = "development";
const knexConfig = config[HAPI_ENV];

const knex = Knex(knexConfig);

export default knex;