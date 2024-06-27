"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_server_1 = require("@hono/node-server");
const hono_1 = require("hono");
require("dotenv/config");
const bookrouter_1 = require("./books/bookrouter");
const cors_1 = require("hono/cors");
const app = new hono_1.Hono();
app.use("*", (0, cors_1.cors)({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type"],
}));
app.get('/api', (c) => {
    return c.text('Hello Hono!');
});
app.route('/', bookrouter_1.bookRouter);
(0, node_server_1.serve)({
    fetch: app.fetch,
    port: Number(process.env.PORT) || 3000,
});
console.log(`Server is running on port ${process.env.PORT}`);
