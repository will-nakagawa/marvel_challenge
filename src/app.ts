import * as dotenv from "dotenv";
dotenv.config();

const yargs = require("yargs");

import {startCollectingData} from './service/obtainSpectrumData';

const options = yargs.argv;

 async function init() {
    await startCollectingData();
    process.exit(0);
 };

init();