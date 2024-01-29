import * as dotenv from "dotenv";
dotenv.config();
import Hapi, { Server } from "@hapi/hapi";
import {startCollectingData} from './service/obtainSpectrumData';
import knex from "./database/db";
import charactersRoutes from "./routes/characterRoute";
import healthCheckRoutes from "./routes/healthCheckRoute";

export let server: Server;

export const init = async function () {
  server = Hapi.server({
    port: process.env.PORT || 4000,
    host: "0.0.0.0",
   });

  // Routes
  server.route(charactersRoutes);
  server.route(healthCheckRoutes);

  console.log(`Listening on ${server.settings.host}:${server.settings.port}`);
  await startCollectingData();
  server.decorate("request", "database", knex);
  await server.start();
};

process.on("unhandledRejection", (err) => {
console.error("unhandledRejection");
console.error(err);
process.exit(1);
});

init();