"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const healthCheckRoutes = [
    {
        method: "GET",
        path: "/",
        handler: () => ({ status: 200, message: "ok" }),
    },
];
exports.default = healthCheckRoutes;
