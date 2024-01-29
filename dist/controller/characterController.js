"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = void 0;
const obtainSpectrumData_1 = require("../service/obtainSpectrumData");
const utils_1 = require("../utils/utils");
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, obtainSpectrumData_1.startCollectingData)();
            return { status: 200, message: "Charactes collected successfully!" };
        }
        catch (err) {
            (0, utils_1.logger)("error", err.message);
            return { status: 500, message: "Error to collect characters data." };
        }
    });
}
exports.start = start;
