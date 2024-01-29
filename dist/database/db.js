"use strict";
/**
* File Name : db.ts
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const config = require('../knexfile');
const HAPI_ENV = "development";
const knexConfig = config[HAPI_ENV];
const knex = (0, knex_1.default)(knexConfig);
exports.default = knex;
