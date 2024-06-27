"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRouter = void 0;
const hono_1 = require("hono");
const book_controller_1 = require("./book-controller");
exports.bookRouter = new hono_1.Hono();
exports.bookRouter
    .get("/api/books", book_controller_1.listBooks)
    .get("/api/books/:id", book_controller_1.getbook)
    .post("/api/create-book", book_controller_1.createbook)
    .put("/api/update-book/:id", book_controller_1.updatebook)
    .delete("/api/delete-book/:id", book_controller_1.deletebook);
