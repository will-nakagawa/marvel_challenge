require('dotenv').config({path: '../.env'});

const { DB_URL } = process.env;

// Update with your config settings.
const config = {
  development: {
    client: "postgresql",
    connection: DB_URL,
    migrations: {
      directory: "./migrations",
      extension: "ts",
    },
    seeds: { directory: "./seeds" },
  },

  staging: {
    client: "postgresql",
    connection: DB_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./migrations",
      extension: "ts",
    },
    seeds: { directory: "./seeds" },
  },

  production: {
    client: "postgresql",
    connection: DB_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./migrations",
      extension: "ts",
    },
    seeds: { directory: "./seeds" },
  },
};

module.exports = config;
