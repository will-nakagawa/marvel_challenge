"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const obtainSpectrumData_1 = require("../service/obtainSpectrumData");
const charactersRoutes = [
    {
        method: "GET",
        path: "/characters/start",
        handler: obtainSpectrumData_1.startCollectingData,
    },
    {
        method: "GET",
        path: "/characters",
        handler: () => "ok",
    },
];
exports.default = charactersRoutes;
