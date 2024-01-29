import {startCollectingData} from '../service/obtainSpectrumData';
import { logger } from '../utils/utils';

export async function start() {
    try {
        await startCollectingData();
        return { status: 200, message: "Charactes collected successfully!" }
    } catch(err:any) {
        logger("error", err.message);
        return { status: 500, message: "Error to collect characters data." }
    }
}