"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const characterController_1 = require("../controller/characterController");
const charactersRoutes = [
    {
        method: "GET",
        path: "/characters/start",
        handler: characterController_1.start,
    },
];
exports.default = charactersRoutes;
