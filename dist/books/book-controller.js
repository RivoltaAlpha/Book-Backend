"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletebook = exports.updatebook = exports.createbook = exports.getbook = exports.listBooks = void 0;
const bookservice_1 = require("./bookservice");
const listBooks = async (c) => {
    try {
        //limit the number of books to be returned
        const limit = Number(c.req.query('limit'));
        const data = await (0, bookservice_1.getBookService)(limit);
        if (data == null || data.length == 0) {
            return c.text("book not found", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.listBooks = listBooks;
//search book
const getbook = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        console.log(id);
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        const book = await (0, bookservice_1.getBookById)(id);
        if (book === null) {
            return c.text("book not found", 404);
        }
        return c.json(book, 200);
    }
    catch (error) {
        console.error(error?.message);
    }
};
exports.getbook = getbook;
// create book
const createbook = async (c) => {
    try {
        const book = await c.req.json();
        const createdbook = await (0, bookservice_1.createBookService)(book);
        console.log("book created");
        if (!createdbook)
            return c.text("book not created", 404);
        return c.json({ msg: createdbook }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createbook = createbook;
// updatebook
const updatebook = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const book = await c.req.json();
    try {
        // search for the book
        const searchedbook = await (0, bookservice_1.getBookById)(id);
        if (searchedbook == undefined)
            return c.text("book not found", 404);
        // get the data and update it
        const res = await (0, bookservice_1.updateBookService)(id, book);
        // return a success message
        if (!res)
            return c.text("book not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updatebook = updatebook;
//delete book
const deletebook = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        //search for the book
        const book = await (0, bookservice_1.getBookById)(id);
        if (book == undefined)
            return c.text("book not found", 404);
        //deleting the book
        const res = await (0, bookservice_1.deleteBookService)(id);
        if (!res)
            return c.text("book not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deletebook = deletebook;
